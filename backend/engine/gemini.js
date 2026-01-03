const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeTaste(userNotes) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      You are a movie taste analyst. 
      Read the following user notes about movies they like or dislike:
      "${userNotes}"
      
      Extract the user's movie taste profile efficiently. 
      Return ONLY a JSON object with this format (no markdown, no extra text):
      {
        "topGenre": "GenreName",
        "secondaryGenre": "GenreName",
        "keywords": ["keyword1", "keyword2", "keyword3"],
        "mood": "MoodDescription"
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Cleanup potential markdown backticks from response
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        // Fallback if AI fails
        return {
            topGenre: "Action",
            secondaryGenre: "Adventure",
            keywords: ["classic", "impactful"],
            mood: "Exciting"
        };
    }
}

module.exports = { analyzeTaste };
