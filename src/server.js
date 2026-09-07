require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const redisClient = require("./config/redis");

const urlRoutes = require("./routes/urlRoutes");
const redirectRoutes = require("./routes/redirectRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

// Serve frontend from public folder
app.use(express.static("public"));

// Connect databases
connectDB();

redisClient.connect();

// API routes
app.use("/api", urlRoutes);
app.use("/api/analytics", analyticsRoutes);

// URL redirect route
app.use("/", redirectRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});