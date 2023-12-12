const express = require('express');

const app = express();
const port = 4000;

// Azure AD configuration for receiver
const azureAdConfig = {
    tenantId: 'add67cd2-c8b2-416c-b171-b61b22be92f4',
    clientId: '6e0063e1-5b74-4730-99c6-2b1541144e5c',
    clientSecret: 'NJR8Q~KkS4-EIPKtJMEIS5EeHLlCNfBAzH2fmaFc',
};

// Middleware to validate access token
function validateAccessToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Unauthorized: Access token missing' });
    }

    const accessToken = authorizationHeader.split(' ')[1];
    // Add logic to validate the access token using Azure AD or other means
    // For simplicity, this example does not perform detailed token validation

    // If token is valid, proceed to the next middleware
    next();
}

// Handle requests to receive data
app.get('/api/data', validateAccessToken, (req, res) => {
    res.json({ message: 'Data from Receiver App' });
});

// Start the receiver app
app.listen(port, () => {
    console.log(`Receiver app listening at http://localhost:${port}`);
});
