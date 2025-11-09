export class PriceChangeEvent {
    symbol: string;
    message?: string;
    volumeChange: number;
    volumeChangePercentage: number;
    priceChange: number;
    priceChangePercentage: number;
    before: Quote;
    after: Quote;  
}

export class Quote {
    price: number;
    volume: number;
    timestamp: number;
    timestampISO: string;
    dayChange: number;
    dayChangePercentage: number;
}