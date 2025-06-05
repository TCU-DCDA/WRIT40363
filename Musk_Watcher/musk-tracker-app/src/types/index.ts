export interface Website {
    url: string;
    title: string;
    dateScraped: Date;
}

export interface ScraperConfig {
    userAgent: string;
    timeout: number;
    maxRetries: number;
}