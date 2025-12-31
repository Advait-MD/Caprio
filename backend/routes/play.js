const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.json({ message: `play movie ${req.params.id}` });
});

module.exports = router;
