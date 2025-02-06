const express = require("express");
const cors = require("cors");
const connectDB= require("./config/db");
require("dotenv").config();
const app=express();

//middeware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth",require("./routes/authRoutes"));
app.use("api/events",require("./routes/eventRoutes"));

//start server
const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));