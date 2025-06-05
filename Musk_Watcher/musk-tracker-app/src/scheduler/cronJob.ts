import { CronJob } from 'cron';
import { WebScraper } from '../scraper/webScraper';

export function startScheduler(webScraper: WebScraper): void {
    console.log('Starting 15-minute scheduler for Elon Musk website tracking...');
    
    // Run every 15 minutes
    const job = new CronJob('*/15 * * * *', async () => {
        console.log('Running scheduled scrape for Elon Musk references...');
        try {
            await webScraper.scrapeWebsites();
            console.log('Scheduled scrape completed successfully');
        } catch (error) {
            console.error('Error during scheduled scrape:', error);
        }
    }, null, true, 'America/New_York');

    console.log('Scheduler started - will run every 15 minutes');
}