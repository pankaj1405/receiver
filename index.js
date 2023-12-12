const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Azure AD configuration for receiver
const azureAdConfig = {
    tenantId: 'add67cd2-c8b2-416c-b171-b61b22be92f4',
    clientId: '6e0063e1-5b74-4730-99c6-2b1541144e5c',
    clientSecret: 'NJR8Q~KkS4-EIPKtJMEIS5EeHLlCNfBAzH2fmaFc',
};

async function validateAccessToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
 
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Unauthorized: Access token missing' });
    }
 
    const accessToken = authorizationHeader.split(' ')[1];
 
    try {
        const response = await axios.get(`https://login.microsoftonline.com/${azureAdConfig.tenantId}/oauth2/v2.0/token/validate?api-version=1.0`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
 
        // If token is valid, proceed to the next middleware
        next();
    } catch (error) {
        console.error('Error validating access token:', error.message);
        res.status(401).json({ error: 'Unauthorized: Invalid access token' });
    }
}

// Default Response on home
app.get('/', (req, res) => {
  res.send('Hello, World! receiver.....');
});

// Handle requests to receive data
app.get('/api/data', validateAccessToken, (req, res) => {
    res.json({ message: 'Data from Receiver App' });
});

// Start the receiver app
app.listen(port, () => {
    console.log(`Receiver app listening at http://localhost:${port}`);
});
