# 🚀 Musk Watcher App

A web application that automatically tracks and displays web references to Elon Musk in reverse chronological order. The app refreshes every 15 minutes to find new mentions across popular tech and business websites.

## Features

- 🔍 **Automatic Web Scraping**: Searches major tech and business sites for Elon Musk references
- ⏰ **15-Minute Auto-Refresh**: Automatically updates every 15 minutes
- 📊 **Clean Web Interface**: Modern, responsive dashboard showing results
- 🔗 **Direct Links**: Click-through links to original articles
- 📅 **Chronological Sorting**: Latest references shown first
- 🔄 **Manual Refresh**: Force immediate update when needed

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Application**:
   ```bash
   npm start
   ```

3. **View Dashboard**:
   Open your browser to `http://localhost:3000`

## How It Works

The app scrapes these popular tech and business sites for Elon Musk references:
- CNBC
- Bloomberg
- TechCrunch
- The Verge

### Architecture

- **Express Server**: Serves the web interface and API
- **Web Scraper**: Uses Cheerio to parse HTML and find Elon Musk mentions
- **Scheduler**: Cron job runs every 15 minutes automatically
- **JSON Storage**: Persistent data storage in JSON files
- **Responsive Frontend**: Clean, modern web interface

### API Endpoints

- `GET /` - Main dashboard
- `GET /api/websites` - JSON list of all Elon Musk references
- `POST /api/refresh` - Trigger manual refresh

## License
This project is licensed under the MIT License. See the LICENSE file for more details.