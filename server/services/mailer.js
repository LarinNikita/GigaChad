const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const options = {
  host: process.env.NODEMAILER_HOST || "smtp.mail.ru",
  secure: true,
  port: Number(process.env.NODEMAILER_PORT) || 465,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
};

const transport = nodemailer.createTransport(options);

const sendMail = async ({
  sender,
  recipient,
  subject,
  html,
  text,
  attachments,
}) => {
  try {
    const from = sender || process.env.NODEMAILER_USER;

    const mailOptions = {
      from: from,
      to: recipient,
      subject,
      html,
      text: text,
      attachments,
    };

    return transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = async (args) => {
  if (process.env.NODE_ENV === "devolopment") {
    return new Promise.resolve();
  } else {
    return sendMail(args);
  }
};
