const dotenv = require("dotenv");
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "https://flower-shop-zsdd.vercel.app",
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma'
    ],
    credentials: true
  })
);
app.options('*', cors());
// Routes
app.get("/", (req, res) => {
  console.log("running");
  res.send("Server is running!"); // Sends a response
});

// app.use("/api/journals", require("./routes/journalRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Start Server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
