const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "ADMIN",
    },
  },
  { timestamps: true }
);

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED"],
      default: "OPEN",
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
