const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

router.post('/', async (req, res) => {
  const { logs, riskScore } = req.body;

  const newSession = new Session({
    logs,
    riskScore,
    createdAt: new Date()
  });

  await newSession.save();
  res.json(newSession);
});

module.exports = router;
