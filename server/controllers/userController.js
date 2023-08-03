const FriendRequestModel = require("../models/friendRequest");
const UserModel = require("../models/user");
const filterObj = require("../utils/filterObj");

exports.updateMe = async (req, res, next) => {
  const { user } = req;

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "about",
    "avatar"
  );

  const update_user = await UserModel.findByIdAndUpdate(
    user._id,
    filteredBody,
    {
      new: true,
      validateModifiedOnly: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: update_user,
    message: "Profile Updated successfully",
  });
};

exports.getUsers = async (req, res, next) => {
  const all_users = await UserModel.find({
    verified: true,
  }).select("firstName lastName _id");

  const this_user = req.user;

  const remaining_users = all_users.filter(
    (user) =>
      !this_user.friends.includes(user._id) &&
      user._id.toString() !== req.user._id.toString()
  );

  res.status(200).json({
    status: "success",
    data: remaining_users,
    message: "Users found successfully",
  });
};

exports.getRequest = async (req, res, next) => {
  const requests = await FriendRequestModel.find({
    recepient: req.user._id,
  }).populate("sender", "_id firstName lastName");

  res.status(200).json({
    status: "success",
    data: requests,
    message: "Friends requests Found successfully",
  });
};

exports.getFriends = async (req, res, next) => {
  const this_user = await UserModel.findById(req.user._id).populate(
    "friends",
    "_id firstName lastName"
  );

  res.status(200).json({
    status: "success",
    data: this_user.friends,
    message: "Friends Found successfully",
  });
};
