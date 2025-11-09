export declare class PriceAnalysis {
    Symbol: string;
    index: string;
    '1m': {
        ChangePercent: number;
        R2: number;
    };
    '3m': {
        ChangePercent: number;
        R2: number;
    };
    '6m': {
        ChangePercent: number;
        R2: number;
    };
    constructor(data: Partial<PriceAnalysis>);
}
