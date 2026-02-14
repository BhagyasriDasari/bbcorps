const express = require('express');
const protect = require('../middleware/authMiddleware');
const {
  getEvents,
  registerEvent,
  myEvents
} = require('../controllers/eventController');

const router = express.Router();

router.get('/', getEvents);
router.post('/:id/register', protect, registerEvent);
router.get('/my/events', protect, myEvents);

module.exports = router;
