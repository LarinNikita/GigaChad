const app = require("./app");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const OneToOneMessageModel = require("./models/OneToOneMessage");

dotenv.config({ path: "./config.env" });

const { Server } = require("socket.io");
const User = require("./models/user");
const FriendRequest = require("./models/friendRequest");

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const DB = process.env.DBURL.replace("<PASSWORD>", process.env.DBPASSWORD);

mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB OK");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server: ${port}`);
});

io.on("connection", async (socket) => {
  const user_id = socket.handshake.query["user_id"];

  const socket_id = socket.id;

  console.log(`User connected ${socket_id}`);

  if (Boolean(user_id)) {
    await User.findByIdAndUpdate(user_id, { socket_id, status: "Online" });
  }

  socket.on("friend_request", async (data) => {
    const to = await User.findById(data.to).select("socket_id");
    const from = await User.findById(data.from).select("socket_id");

    await FriendRequest.create({
      sender: data.from,
      recipient: data.to,
    });

    io.to(to?.socket_id).emit("new_friend_request", {
      message: "New Friend Request Received",
    });

    io.to(from?.socket_id).emit("request_sent", {
      message: "Request sent successfully",
    });
  });

  socket.on("accept_request", async (data) => {
    const request_doc = await FriendRequest.findById(data.request_id);

    const sender = await User.findById(request_doc.sender);
    const recipient = await User.findById(request_doc.recipient);

    sender.friends.push(request_doc.recipient);
    recipient.friends.push(request_doc.sender);

    await recipient.save({ new: true, validateModifiedOnle: true });
    await sender.save({ new: true, validateModifiedOnle: true });

    await FriendRequest.findByIdAndDelete(data.request_id);

    io.to(sender?.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
    io.to(recipient?.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
  });

  socket.on("get_direct_conversations", async ({ user_id }, callback) => {
    const existing_conversations = await OneToOneMessageModel.find({
      participants: { $all: [user_id] },
    }).populate("participants", "firstName lastName _id email status");

    callback(existing_conversations);
  });

  socket.on("start_conversation", async (data) => {
    const { to, from } = data;

    const existing_conversation = await OneToOneMessageModel.find({
      participants: { $size: 2, $all: [to, from] },
    }).populate("participants", "firstName lastName _id email status");

    if (existing_conversation.length === 0) {
      let new_chat = await OneToOneMessageModel.create({
        participants: [to, from],
      });

      new_chat = await OneToOneMessageModel.findById(new_chat).populate(
        "participants",
        "firstName lastName _id email status"
      );

      socket.emit("start_chat", new_chat);
    } else {
      socket.emit("start_chat", existing_conversation[0]);
    }
  });

  socket.on("get_message", async (data, callback) => {
    const { message } = await OneToOneMessageModel.findById(
      data.conversation_id
    ).select("messages");

    callback(message);
  });

  socket.on("text_message", async (data) => {
    console.log("Received Message", data);

    const { to, from, message, conversation_id, type } = data;

    const to_user = await User.findById(to);
    const to_from = await User.findById(from);

    const new_message = {
      to: to,
      from: from,
      type: type,
      text: message,
    };

    const chat = await OneToOneMessageModel.findById(conversation_id);
    chat.message.push(new_message);

    await chat.save({ new: true, validateModifiedOnly: true });

    io.to(to_user?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });
    io.to(to_from?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });
  });

  // socket.on("file_message", async (data) => {
  //   console.log("Received Message", data);

  //   const fileExtension = path.extname(data.file.name);

  //   const fileNme = `${Date.now()}_${Math.floor(
  //     Math.random() * 10000
  //   )}${fileExtension}`;
  // });

  socket.on("end", async (data) => {
    if (data.user_id) {
      await User.findByIdAndUpdate(data.user_id, { status: "Offline" });
    }
    console.log("Closing connection");
    socket.disconnect(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.close(() => {
    process.exit(1);
  });
});
