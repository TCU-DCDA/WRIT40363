// Simple startup script for Azure
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

console.log('Starting simple server...');
console.log('PORT:', port);

app.get('/', (req, res) => {
    res.send(`
        <html>
        <head><title>Azure Test</title></head>
        <body>
            <h1>🚀 Azure App Service is Working!</h1>
            <p>Time: ${new Date().toISOString()}</p>
            <p>Port: ${port}</p>
            <p>Node.js Version: ${process.version}</p>
            <p><a href="/app">Go to Musk Tracker App</a></p>
        </body>
        </html>
    `);
});

// Redirect to the actual app
app.use('/app', express.static('public'));
app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Simple server running on port ${port}`);
});
