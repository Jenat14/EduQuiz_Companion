const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();
const dotenv = require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Define a route to handle incoming messages from the frontend
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Generate content based on the input message
        const result = await model.generateContentStream(message);

        let output = '';
        for await(const chunk of result.stream){
            output += chunk.text();
        }

        // Send the generated content back to the frontend
        res.json({ message: output });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;