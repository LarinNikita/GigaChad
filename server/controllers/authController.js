const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const otpGenerator = require("otp-generator");
const UserModel = require("../models/user");
const filterObj = require("../utils/filterObj");
const { promisify } = require("util");
const mailService = require("../services/mailer");
const dotenv = require("dotenv");
const otpHTML = require("../templates/Mail/OTP");
const ReserPasswordHTML = require("../templates/Mail/ReserPassword");

dotenv.config({ path: "./config.env" });

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password, verified } = req.body;

  const filterBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "password"
  );

  const existing_user = await UserModel.findOne({ email: email });

  if (existing_user && existing_user.verified) {
    res.status(400).json({
      status: "error",
      message: "Email is already in use, Plese login.",
    });
  } else if (existing_user) {
    await UserModel.findOneAndUpdate({ email: email }, filterBody, {
      new: true,
      validateModifiedOnly: true,
    });

    req.userId = existing_user._id;
    next();
  } else {
    const new_user = await UserModel.create(filterBody);

    req.userId = new_user._id;
    next();
  }
};

exports.sendOTP = async (req, res, next) => {
  const { userId } = req;
  const new_otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const otp_expiry_time = Date.now() + 10 * 60 * 1000;

  const user = await UserModel.findByIdAndUpdate(userId, {
    otp_expiry_time: otp_expiry_time,
  });

  user.otp = new_otp.toString();

  await user.save({ new: true, validateModifiedOnly: true });

  mailService.sendEmail({
    from: process.env.NODEMAILER_USER,
    recipient: user.email,
    subject: "OTP for GigaChat",
    // text: `Your OTP is ${new_otp}. This valid for 10 Mins.`,
    html: otpHTML(user.firstName, new_otp),
  });
  // .then(() => {

  // }).catch((err) => {
  //   console.log(err)
  // });

  res.status(200).json({
    status: "success",
    message: "OTP Sent Successfully",
  });
};

exports.verifiedOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await UserModel.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Email is Invalid or OTP expired",
    });
  }

  if (!(await user.correctOTP(otp, user.otp))) {
    res.status(400).json({
      status: "error",
      message: "OTP is incorrect",
    });
  }

  user.verified = true;
  user.otp = undefined;

  await user.save({ new: true, validateModifiedOnly: true });

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "OTP verified successfully",
    token,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Both email and password are required",
    });
  }

  const userDoc = await UserModel.findOne({ email: email }).select("+password");

  if (
    !userDoc ||
    !(await userDoc.correctPassword(password, userDoc.password))
  ) {
    return res.status(400).json({
      status: "error",
      message: "Email or password is incorrect",
    });
  }

  const token = signToken(userDoc._id);

  res.status(200).json({
    status: "success",
    message: "Logget in successfully",
    token,
  });
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    return req.status(400).json({
      status: "error",
      message: "You are not logged In! Please log in to get access",
    });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const this_user = await UserModel.findById(decoded.userId);

  if (!this_user) {
    return res.status(400).json({
      status: "error",
      message: "The user dosen't exist",
    });
  }

  if (this_user.changePasswordAfter(decoded.iat)) {
    return res.status(400).json({
      status: "error",
      message: "User recently updated password! Please log in again",
    });
  }

  req.user = this_user;
  next();
};

exports.forgotPassword = async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "There is no user with given email address",
    });
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `http://localhost:3000/auth/new-password/?token=${resetToken}`;
    console.log(resetURL);

    mailService.sendEmail({
      from: process.env.NODEMAILER_USER,
      recipient: user.email,
      subject: "Reset Password",
      html: ReserPasswordHTML(user.firstName, resetURL),
    });

    res.status(200).json({
      status: "success",
      message: "Reset Password link sent to Email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      status: "error",
      message: "There was an error sending the email, Please try again later.",
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Token is Invalid or Exprired",
    });
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: "Password Reseted Successfully",
    token,
  });
};
