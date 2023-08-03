const mongoose = require("mongoose");

const oneToOneMessagesSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        to: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        from: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        type: {
          type: String,
          emum: ["Text", "Media", "Document", "Link"],
        },
        text: {
          type: String,
        },
        file: {
          type: String,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

const OneToOneMessage = new mongoose.model(
  "OneToOneMessage",
  oneToOneMessagesSchema
);

module.exports = OneToOneMessage;
