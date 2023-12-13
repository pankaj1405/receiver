const express = require('express');
const jwt = require('jsonwebtoken');

// Replace with your Azure AD application details
const audience = '6e0063e1-5b74-4730-99c6-2b1541144e5c';

const app = express();

app.post('/', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, audience);

    console.log(`Received message from sender: ${req.body.message}`);
    console.log(`Decoded token claims:`, decodedToken);

    res.send('Message received and processed successfully!');
  } catch (error) {
    console.error(error);
    res.status(401).send('Invalid token');
  }
});

app.listen(4000, () => console.log('Receiver listening on port 4000'));
