import { Website } from '../types';
import * as fs from 'fs/promises';
import * as path from 'path';

export class Database {
    private websites: Website[] = [];
    private readonly dataFile: string;

    constructor() {
        this.dataFile = path.join(__dirname, '../../data/websites.json');
    }

    async initialize(): Promise<void> {
        try {
            // Ensure data directory exists
            const dataDir = path.dirname(this.dataFile);
            await fs.mkdir(dataDir, { recursive: true });

            // Load existing data if file exists
            await this.loadFromFile();
        } catch (error) {
            console.log('Initializing new database file...');
            this.websites = [];
        }
    }

    private async loadFromFile(): Promise<void> {
        try {
            const data = await fs.readFile(this.dataFile, 'utf-8');
            const parsed = JSON.parse(data);
            
            // Convert date strings back to Date objects
            this.websites = parsed.map((website: any) => ({
                ...website,
                dateScraped: new Date(website.dateScraped)
            }));
            
            console.log(`📂 Loaded ${this.websites.length} websites from storage`);
        } catch (error) {
            // File doesn't exist or is corrupted, start fresh
            this.websites = [];
        }
    }

    private async saveToFile(): Promise<void> {
        try {
            const data = JSON.stringify(this.websites, null, 2);
            await fs.writeFile(this.dataFile, data, 'utf-8');
        } catch (error) {
            console.error('Error saving to file:', error);
        }
    }

    async saveWebsite(website: Website): Promise<void> {
        // Check if website already exists to avoid duplicates
        const exists = this.websites.some(w => w.url === website.url);
        if (!exists) {
            this.websites.push(website);
            await this.saveToFile();
        }
    }

    async getWebsites(): Promise<Website[]> {
        return this.websites.sort((a, b) => b.dateScraped.getTime() - a.dateScraped.getTime());
    }

    async clear(): Promise<void> {
        this.websites = [];
        await this.saveToFile();
    }

    async getCount(): Promise<number> {
        return this.websites.length;
    }
}