const axios = require('axios');


const API_KEY = '416a5a0c4abf2ab595e1e0129d68d580';

const detectLanguage = async (text) => {
  console.log('Sending request with text:', text); // Debugging line
  try {
    const response = await axios.post(
      'https://ws.detectlanguage.com/0.2/detect',
      { q: text },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Response received:', response.data); // Debugging line
    const detections = response.data.data.detections;
    if (detections && detections.length > 0) {
      const language = detections[0].language;
      console.log(`Detected Language: ${language}`);
    } else {
      console.log('No language detected.');
    }
  } catch (error) {
    console.error('Error detecting language:', error);
  }
};

// Get user input from the command line
const textToDetect = process.argv.slice(2).join(' ');

console.log('Input text:', textToDetect); // Debugging line

if (!textToDetect) {
  console.error('Please provide text to detect.');
  process.exit(1);
}

detectLanguage(textToDetect);
