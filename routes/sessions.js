const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

router.get('/', async (req, res) => {
  const sessions = await Session.find().sort({ createdAt: -1 });
  res.json(sessions);
});

router.get('/:id', async (req, res) => {
  const session = await Session.findById(req.params.id);
  res.json(session);
});

module.exports = router;
