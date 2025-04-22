import { Server } from "socket.io";
import http from "http";
import express from "express";
import { config } from "dotenv";
config()
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [`http://localhost:${process.env.FEport}`],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
 
  const userId = socket.handshake.query.userId;
  onlineUsers.set(socket.id, userId);
  io.emit("onlineUsers", Array.from(onlineUsers.values()));
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  socket?.on("sendMessage",(data)=>{
    const messageObject = JSON.parse(data);
   const receiverIdSocketId = getReceiverSocketId( messageObject.receiverId)
   io.to(receiverIdSocketId).emit("newMessage",messageObject)
    
  });
  

  socket.emit("getOnlineUsers", Object.keys(userSocketMap));
  // Remove user from the online users list when disconnected
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  const userId = onlineUsers.get(socket.id);
 

  onlineUsers.delete(socket.id);

  // Broadcast updated list of online users
  io.emit("onlineUsers", Array.from(onlineUsers.values()));
});


})
export { app, io, server };
