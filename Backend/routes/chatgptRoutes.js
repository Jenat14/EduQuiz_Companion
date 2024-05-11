const express = require('express');
const fetch = require('node-fetch'); // Import fetch for making HTTP requests
const router = express.Router();

// Endpoint to handle chat messages
router.post('/', async (req, res) => {
    try {
        // Extract message from request body
        const { message } = req.body;
        console.log('Request Body:', req.body);

        // Check if message is provided
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Send message to ChatGPT API
        const response = await sendToChatGPT(message);

        // Return response from ChatGPT API to client
        res.json({ response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to send message to ChatGPT API
async function sendToChatGPT(message) {
    try {
        // Replace 'your_openai_api_key' with your actual OpenAI API key
        const apiKey = 'api key';
        const apiUrl = 'https://api.openai.com/v1/completions';

        // Make request to ChatGPT API using fetch
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: message,
                max_tokens: 150
            })
        });

        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch data from ChatGPT API');
        }

        // Parse response as JSON
        const responseData = await response.json();

        // Check if response contains choices
        if (!responseData.choices || responseData.choices.length === 0) {
            throw new Error('No response from ChatGPT API');
        }

        // Extract and return response text from API response
        return responseData.choices[0].text.trim();
    } catch (error) {
        console.error('Error sending request to ChatGPT API:', error);
        throw error;
    }
}

module.exports = router;
