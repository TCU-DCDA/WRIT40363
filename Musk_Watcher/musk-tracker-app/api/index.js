const express = require('express');
const path = require('path');
const fs = require('fs');

// Simple entry point for Vercel
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Mock data for demonstration (since we can't run full scraper on Vercel serverless)
const mockWebsites = [
    {
        title: "Elon Musk's Latest Tweet",
        url: "https://twitter.com/elonmusk",
        dateScraped: new Date().toISOString()
    },
    {
        title: "Tesla Stock Update",
        url: "https://finance.yahoo.com/quote/TSLA",
        dateScraped: new Date(Date.now() - 3600000).toISOString()
    },
    {
        title: "SpaceX Launch Coverage",
        url: "https://www.spacex.com",
        dateScraped: new Date(Date.now() - 7200000).toISOString()
    }
];

// Root route - serve the main dashboard
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API routes
app.get('/api/websites', (req, res) => {
    try {
        // Try to read from data file first, fall back to mock data
        const dataPath = path.join(__dirname, '../data/websites.json');
        if (fs.existsSync(dataPath)) {
            const data = fs.readFileSync(dataPath, 'utf8');
            const websites = JSON.parse(data);
            res.json(websites);
        } else {
            // Use mock data for demo
            res.json(mockWebsites);
        }
    } catch (error) {
        console.error('Error fetching websites:', error);
        // Return mock data if there's an error
        res.json(mockWebsites);
    }
});

app.post('/api/refresh', (req, res) => {
    try {
        console.log('Manual refresh requested...');
        // On Vercel, we can't run the full scraper, so return success with mock data
        res.json({ 
            success: true, 
            message: 'Refresh completed (demo mode on Vercel)',
            count: mockWebsites.length
        });
    } catch (error) {
        console.error('Error during manual refresh:', error);
        res.status(500).json({ error: 'Refresh failed' });
    }
});

app.post('/api/clear', (req, res) => {
    try {
        console.log('Clear data requested...');
        res.json({ success: true, message: 'Data cleared (demo mode)' });
    } catch (error) {
        console.error('Error clearing data:', error);
        res.status(500).json({ error: 'Clear failed' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        environment: 'vercel',
        version: '1.0.0'
    });
});

// For Vercel, we need to export the app
module.exports = app;
