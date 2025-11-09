export class PriceAnalysis {
    Symbol: string;
    index: string;
    w1: PriceIntervalAnalysis;
    w2: PriceIntervalAnalysis;  
    w3: PriceIntervalAnalysis;
    m1: PriceIntervalAnalysis;
    m3: PriceIntervalAnalysis;
    m6: PriceIntervalAnalysis;
}

export class PriceIntervalAnalysis {
        ChangePercent: number;
        R2: number;
        PredictedNextPrice: number;
        MinPrice: number;
        MaxPrice: number;
    }
