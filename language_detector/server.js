require('dotenv').config();  // Load environment variables from .env file
var DetectLanguage = require('detectlanguage');

const express = require('express');
const axios = require('axios');
const app = express();
const API_KEY = '416a5a0c4abf2ab595e1e0129d68d580';

app.use(express.json());
app.use(express.static('public'));  // Serve static files from the public directory

// Endpoint to detect language
app.post('/detect-language', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.get(
      'https://ws.detectlanguage.com/0.2/languages',
      { q: text },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );

    const language = response.data.data.detections[0].language;
    res.json({ language });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error detecting language');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

