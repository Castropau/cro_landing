// import express from "express";
// import { emitTicketUpdate } from "../server"; // make sure export is correct

// const router = express.Router();

// let tickets = [
//   {
//     ticket_number: "12345",
//     email: "user@example.com",
//     concern: "Login issue",
//     date_created: new Date().toISOString(),
//     status: "open",
//   },
//   // Add more if needed
// ];

// router.get("/", (req, res) => {
//   res.json(tickets);
// });

// router.post("/claim", (req, res) => {
//   const { ticket_number } = req.body;

//   tickets = tickets.map((ticket) =>
//     ticket.ticket_number === ticket_number
//       ? { ...ticket, status: "claimed" }
//       : ticket
//   );

//   const updatedTicket = tickets.find((t) => t.ticket_number === ticket_number);
//   emitTicketUpdate(updatedTicket);
//   res.json({ success: true });
// });

// export default router;
