import { injectable } from 'tsyringe';
import { PriceAnalysis } from '../models/price-analysis.model';

@injectable()
export class MessageFormatterHelper {
    formatBestPerformersMessage(performers: PriceAnalysis[]): string {
        if (performers.length === 0) {
            return 'No best performers found';
        }

        let message = '';
        for (const performer of performers) {
            message += `${performer.Symbol} --> ${performer.m1.PredictedNextPrice}\n\n`;
        }

        return message;
    }
}
