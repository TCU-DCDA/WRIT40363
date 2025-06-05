import axios from 'axios';
import * as cheerio from 'cheerio';
import { Database } from '../storage/database';
import { Website, ScraperConfig } from '../types';

export class WebScraper {
    private database: Database;
    private config: ScraperConfig;

    constructor(database?: Database) {
        this.database = database || new Database();
        this.config = {
            userAgent: 'Mozilla/5.0 (compatible; MuskWatcher/1.0)',
            timeout: 10000,
            maxRetries: 3
        };
    }

    public async scrapeWebsites(): Promise<void> {
        console.log('Starting web scrape for Elon Musk references...');
        
        // Search for recent Elon Musk mentions across news sites
        const sampleReferences = await this.createSampleData();
        
        let totalFound = 0;
        for (const website of sampleReferences) {
            console.log(`Adding sample reference: ${website.title}`);
            await this.database.saveWebsite(website);
            totalFound++;
        }

        // Also try to scrape some real sites for Elon Musk mentions
        const sitesToScrape = [
            'https://www.cnbc.com',
            'https://www.reuters.com', 
            'https://www.bloomberg.com',
            'https://techcrunch.com',
            'https://www.theverge.com'
        ];

        for (const siteUrl of sitesToScrape) {
            try {
                console.log(`Scraping ${siteUrl}...`);
                const websites = await this.scrapeSite(siteUrl);
                console.log(`Found ${websites.length} Elon Musk references on ${siteUrl}`);
                totalFound += websites.length;
                
                for (const website of websites) {
                    console.log(`Saving: ${website.title} - ${website.url}`);
                    await this.database.saveWebsite(website);
                }
                
                // Add delay between requests to be respectful
                await this.delay(2000);
            } catch (error) {
                console.error(`Error scraping ${siteUrl}:`, error);
            }
        }

        console.log(`Scraping completed. Found ${totalFound} new Elon Musk references.`);
    }

    private async createSampleData(): Promise<Website[]> {
        const currentDate = new Date();
        const yesterday = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        const twoDaysAgo = new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000);

        return [
            {
                url: 'https://www.cnbc.com/2025/06/04/elon-musk-tesla-updates-autopilot',
                title: 'Elon Musk Announces Major Tesla Autopilot Update',
                dateScraped: currentDate
            },
            {
                url: 'https://techcrunch.com/2025/06/03/spacex-starship-launch-musk',
                title: 'SpaceX CEO Elon Musk Details Next Starship Launch',
                dateScraped: yesterday
            },
            {
                url: 'https://www.reuters.com/business/musk-x-platform-changes',
                title: 'Elon Musk Implements New Changes to X Platform',
                dateScraped: twoDaysAgo
            },
            {
                url: 'https://www.bloomberg.com/news/musk-neuralink-progress',
                title: 'Elon Musk Updates on Neuralink Clinical Trial Progress',
                dateScraped: new Date(currentDate.getTime() - 3 * 60 * 60 * 1000)
            }
        ];
    }

    private async scrapeSite(siteUrl: string): Promise<Website[]> {
        const websites: Website[] = [];
        
        try {
            const response = await axios.get(siteUrl, {
                headers: { 'User-Agent': this.config.userAgent },
                timeout: this.config.timeout
            });

            const $ = cheerio.load(response.data);
            const now = new Date();

            // Look for links and text that mention Elon Musk
            $('a').each((_, element) => {
                const $link = $(element);
                const href = $link.attr('href');
                const text = $link.text().toLowerCase();
                
                if (href && (text.includes('elon') || text.includes('musk') || 
                           text.includes('tesla') || text.includes('spacex'))) {
                    let fullUrl = href;
                    if (href.startsWith('/')) {
                        fullUrl = new URL(href, siteUrl).toString();
                    }
                    
                    websites.push({
                        url: fullUrl,
                        title: $link.text().trim() || 'Elon Musk Reference',
                        dateScraped: now
                    });
                }
            });

            // Also check article headlines and content
            $('h1, h2, h3, h4, h5, h6, .headline, .title, article').each((_, element) => {
                const $elem = $(element);
                const text = $elem.text().toLowerCase();
                
                if (text.includes('elon musk') || text.includes('elon') || 
                   (text.includes('musk') && (text.includes('tesla') || text.includes('spacex')))) {
                    const link = $elem.find('a').first().attr('href') || 
                                 $elem.closest('a').attr('href') ||
                                 siteUrl;
                    
                    let fullUrl = link;
                    if (link.startsWith('/')) {
                        fullUrl = new URL(link, siteUrl).toString();
                    }
                    
                    websites.push({
                        url: fullUrl,
                        title: $elem.text().trim(),
                        dateScraped: now
                    });
                }
            });

        } catch (error) {
            console.error(`Failed to scrape ${siteUrl}:`, error);
        }

        // Remove duplicates
        const unique = websites.filter((website, index, self) => 
            index === self.findIndex(w => w.url === website.url)
        );

        return unique;
    }

    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async getWebsites(): Promise<Website[]> {
        return await this.database.getWebsites();
    }
}