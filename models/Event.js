const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Event", EventSchema);
