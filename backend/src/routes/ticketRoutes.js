const express = require("express");
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  updateTicketStatus,
  addComment,
} = require("../controllers/ticketController");

router.patch("/tickets/:id/status", updateTicketStatus);

router.post("/tickets/:id/comments", addComment);

// user creates ticket
router.post("/tickets", createTicket);

// admin views all tickets
router.get("/tickets", getAllTickets);

module.exports = router;
