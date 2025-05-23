
import Conversation from "../DB/models/converstaion.model.js";
import Message from "../DB/models/message.model.js";

export const sendMessage = async (req, res) => {
  const senderId = req.user._id;

  const { receiverId } = req.query;
  const { message } = req.body;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId: receiverId,
    message:message,
   
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  // this will run in parallel
  await Promise.all([conversation.save(), newMessage.save()]);

  res.status(201).json(newMessage);
};

export const getMessages = async (req, res) => {
  const { receiverId } = req.query;

  const senderId = req.user._id;
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");
  
  if (!conversation) {
    return res.status(400).json({message:""});
  }
  


  const Messages = conversation.messages.map((message) => {
    return {
      ...message.toObject(), // Ensure proper handling of Mongoose document
      message: message.message, // Decrypt the message text
    };
  });

  return res.status(200).json(Messages);
};
