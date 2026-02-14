const Event = require('../models/Event');
const Registration = require('../models/Registration');

exports.getEvents = async (req, res) => {
  const { search, category, location } = req.query;
  let query = {};

  if (search) query.name = { $regex: search, $options: 'i' };
  if (category) query.category = category;
  if (location) query.location = location;

  const events = await Event.find(query);
  res.json(events);
};

exports.registerEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event || event.capacity <= 0) {
    return res.status(400).json({ message: "Event full" });
  }

  const alreadyRegistered = await Registration.findOne({
    user: req.user._id,
    event: event._id
  });

  if (alreadyRegistered) {
    return res.status(400).json({ message: "Already registered" });
  }

  await Registration.create({
    user: req.user._id,
    event: event._id
  });

  event.capacity -= 1;
  await event.save();

  res.json({ message: "Registered successfully" });
};

exports.myEvents = async (req, res) => {
  const registrations = await Registration.find({
    user: req.user._id
  }).populate('event');

  res.json(registrations);
};

exports.cancelRegistration = async (req, res) => {
  const registration = await Registration.findOne({
    user: req.user._id,
    event: req.params.id
  });

  if (!registration) {
    return res.status(404).json({ message: "Registration not found" });
  }

  await registration.deleteOne();

  await Event.findByIdAndUpdate(req.params.id, {
    $inc: { capacity: 1 }
  });

  res.json({ message: "Registration cancelled" });
};
