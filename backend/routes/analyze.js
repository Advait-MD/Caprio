const express = require('express');
const router = express.Router();
const { analyzeTaste } = require('../engine/gemini.js');
const { recommend } = require('../engine/recommendEngine.js');

router.post('/', async (req, res) => {
    const { notes } = req.body;

    if (!notes) {
        return res.status(400).json({ error: "Notes are required" });
    }

    // 1. Analyze notes with Gemini
    const tasteProfile = await analyzeTaste(notes);
    console.log("Analyzed Taste:", tasteProfile);

    // 2. Get recommendations based on that profile
    const recommendation = await recommend(tasteProfile);

    res.json({
        taste: tasteProfile,
        recommendation: recommendation
    });
});

module.exports = router;
