// import express from "express";
// import http from "http";
// import cors from "cors";
// import { Server } from "socket.io";
// import ticketRoutes from "./routes/tickets";

// const app = express();
// const server = http.createServer(app);

// app.use(cors());
// app.use(express.json());
// app.use("/api/tickets", ticketRoutes);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Frontend
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// // Broadcast ticket updates
// export const emitTicketUpdate = (updatedTicket: any) => {
//   io.emit("ticketUpdated", updatedTicket);
// };

// server.listen(3001, () => {
//   console.log("Socket.IO + Express server running on http://localhost:3001");
// });
