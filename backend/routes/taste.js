const express = require('express');
const router = express.Router();

router.post('/submit', (req, res) => {
  res.json({ message: 'taste submitted' });
});

module.exports = router;
