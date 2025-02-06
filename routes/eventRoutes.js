const express = require("express");
const Event = require("../models/Event.");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create Event
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const event = new Event({
      name,
      description,
      date,
      createdBy: req.user.id,
    });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Attend Event
router.post("/:id/attend", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
