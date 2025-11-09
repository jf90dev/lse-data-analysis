export class Intraday {
    code: string;
    timestamp: number;
    gmtOffset: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    previousClose: number;
    change: number;
    changePercentage: number;
    highPercentage: number;
    lowPercentage: number;

    constructor(data: any) {
        this.code = data.code;
        this.timestamp = data.timestamp;
        this.gmtOffset = data.gmtoffset;
        this.open = data.open;
        this.high = data.high;
        this.low = data.low;
        this.close = data.close;
        this.volume = data.volume;
        this.previousClose = data.previousClose;
        this.change = data.change;
        this.changePercentage = data.change_p;
        
        // Derive highPercentage and lowPercentage from previousClose
        this.highPercentage = this.previousClose > 0 
            ? parseFloat((((this.high - this.previousClose) / this.previousClose) * 100).toFixed(2))
            : 0;
        this.lowPercentage = this.previousClose > 0 
            ? parseFloat((((this.low - this.previousClose) / this.previousClose) * 100).toFixed(2))
            : 0;
    }
}
