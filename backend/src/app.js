const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(express.json());
console.log("App starting...");

app.use(cors({
  origin: "http://localhost:5173",
}));


const ticketRoutes = require("./routes/ticketRoutes");
app.use("/api", ticketRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.json({ message: "Support Ticket System API is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
