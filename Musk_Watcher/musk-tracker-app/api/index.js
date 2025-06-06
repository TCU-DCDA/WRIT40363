const express = require('express');
const path = require('path');

// Simple entry point for Vercel
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Simple health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// For Vercel, we need to export the app
module.exports = app;

// Only listen if running directly (not on Vercel)
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
