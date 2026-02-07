const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    // basic validation
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
    });

    res.status(201).json({
      message: "Ticket created successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: tickets.length,
      data: tickets,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
exports.updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["OPEN", "IN_PROGRESS", "RESOLVED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    if (ticket.status === "RESOLVED") {
      return res.status(400).json({
        message: "Resolved ticket cannot be updated",
      });
    }

    ticket.status = status;
    await ticket.save();

    res.status(200).json({
      message: "Ticket status updated",
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, author } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Comment message is required",
      });
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    ticket.comments.push({
      message,
      author: author || "ADMIN",
    });

    await ticket.save();

    res.status(201).json({
      message: "Comment added successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
