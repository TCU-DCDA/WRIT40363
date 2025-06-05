import express from 'express';
import path from 'path';
import { WebScraper } from './scraper/webScraper';
import { startScheduler } from './scheduler/cronJob';
import { Database } from './storage/database';

const app = express();
const port = process.env.PORT || 3000;
const database = new Database();
const webScraper = new WebScraper(database);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.get('/api/websites', async (req, res) => {
    try {
        const websites = await database.getWebsites();
        res.json(websites);
    } catch (error) {
        console.error('Error fetching websites:', error);
        res.status(500).json({ error: 'Failed to fetch websites' });
    }
});

app.post('/api/refresh', async (req, res) => {
    try {
        console.log('Manual refresh requested...');
        await webScraper.scrapeWebsites();
        res.json({ success: true, message: 'Refresh completed' });
    } catch (error) {
        console.error('Error during manual refresh:', error);
        res.status(500).json({ error: 'Refresh failed' });
    }
});

app.post('/api/clear', async (req, res) => {
    try {
        console.log('Clear data requested...');
        await database.clear();
        res.json({ success: true, message: 'Data cleared' });
    } catch (error) {
        console.error('Error clearing data:', error);
        res.status(500).json({ error: 'Clear failed' });
    }
});

app.get('/api/stats', async (req, res) => {
    try {
        const count = await database.getCount();
        res.json({ totalCount: count });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Serve a server-side rendered version for debugging
app.get('/ssr', async (req, res) => {
    try {
        const websites = await database.getWebsites();
        const websitesHtml = websites.map(website => `
            <div style="border-bottom: 1px solid #eee; padding: 15px 0;">
                <div style="font-weight: bold; font-size: 1.1em; margin-bottom: 5px;">${escapeHtml(website.title)}</div>
                <div style="color: #666; font-size: 0.9em; margin-bottom: 5px;">
                    <a href="${escapeHtml(website.url)}" target="_blank" style="color: #2196f3; text-decoration: none;">
                        ${escapeHtml(website.url)}
                    </a>
                </div>
                <div style="color: #999; font-size: 0.8em;">
                    Found: ${new Date(website.dateScraped).toLocaleString()}
                </div>
            </div>
        `).join('');
        
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Elon Musk Tracker - Server Side Rendered</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; }
                .header { 
                    text-align: center; 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; 
                    padding: 30px; 
                    border-radius: 10px; 
                    margin-bottom: 20px; 
                    position: relative;
                    overflow: hidden;
                }
                .header-content { position: relative; z-index: 2; }
                .header-image { 
                    position: absolute; 
                    top: 10px; 
                    right: 20px; 
                    width: 80px; 
                    height: 80px; 
                    border-radius: 50%; 
                    border: 3px solid rgba(255,255,255,0.3); 
                    object-fit: cover; 
                    z-index: 1; 
                }
                .count { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/800px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg" alt="Elon Musk" class="header-image">
                <div class="header-content">
                    <h1>🚀 Elon Musk Tracker (Server-Side Rendered)</h1>
                    <p>Tracking web references to Elon Musk</p>
                </div>
            </div>
            <div class="count">
                <strong>Total References Found:</strong> ${websites.length}
            </div>
            <div style="background: white; border-radius: 10px; padding: 20px;">
                ${websitesHtml || '<div style="text-align: center; padding: 40px; color: #666;">No Elon Musk references found yet.</div>'}
            </div>
            <p><a href="/">← Back to JavaScript version</a></p>
        </body>
        </html>
        `;
        
        res.send(html);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).send(`Error: ${errorMessage}`);
    }
});

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const init = async () => {
    console.log('🚀 Elon Musk Tracker App Starting...');
    
    // Initialize database (load existing data)
    await database.initialize();
    
    console.log('Performing initial scrape...');
    
    try {
        await webScraper.scrapeWebsites();
        console.log('Initial scrape completed');
        
        // Start the 24-hour scheduler
        startScheduler(webScraper);
    } catch (error) {
        console.error('Error during initialization:', error);
    }
};

app.listen(port, () => {
    console.log(`🌐 Server running at http://localhost:${port}`);
    console.log(`📊 View the Elon Musk tracker dashboard at http://localhost:${port}`);
    init();
});