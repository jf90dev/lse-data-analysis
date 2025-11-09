import { injectable, inject } from 'tsyringe';
import { PriceAnalysisRepository } from '../repositories/price-analysis.repository';
import { SnsClient } from '@shared/src/clients/sns.client';
import { EodhdClient } from '@shared/src/clients/eodhd.client';
import { LoggerService } from '@shared/src/services/logger.service';
import { MessageFormatterHelper } from '../helpers/message-formatter.helper';
import { Intraday } from '../models/intraday.model';
import { PriceAnalysis } from '../models/price-analysis.model';

@injectable()
export class PerformanceService {
    constructor(
        @inject('PriceAnalysisRepository') private priceAnalysisRepository: PriceAnalysisRepository,
        @inject('SnsClient') private snsClient: SnsClient,
        @inject('EodhdClient') private eodhdClient: EodhdClient,
        @inject('LoggerService') private logger: LoggerService,
        @inject('MessageFormatterHelper') private messageFormatter: MessageFormatterHelper
    ) {}

    async analyzeBestPerformers(indexType: string): Promise<PriceAnalysis[]> {
        this.logger.info('Executing aggregation pipeline');
        const performers = await this.priceAnalysisRepository.findTopPerformers(indexType);

        if (performers.length === 0) {
            this.logger.info('No best performers found');
            return [];
        }

        let eligiblePerformers: PriceAnalysis[] = [];

        this.logger.debug(`Found ${performers.length} best performers`);

        // Get real-time data for each best performer
        for (const performer of performers) {
            try {
                this.logger.debug(`Fetching real-time data for ${performer.Symbol}`);
                const realTimeData = await this.eodhdClient.getRealTimeData(performer.Symbol);
                
                // Map the response data to Intraday model
                if (realTimeData.data) {
                    const intradayData = new Intraday(realTimeData.data);
                    this.logger.debug(`Intraday data for ${performer.Symbol}: ${intradayData.changePercentage}`);

                    if (performer.m1.PredictedNextPrice > intradayData.close) {
                        const percentDifferenceFromPrediction = ((intradayData.close - performer.m1.PredictedNextPrice) / performer.m1.PredictedNextPrice * 100);
                        this.logger.info(`${performer.Symbol} meets criteria: PredictedNextPrice1m=${performer.m1.PredictedNextPrice}, close=${intradayData.close}, percentChange=${percentDifferenceFromPrediction.toFixed(2)}%`);
                        eligiblePerformers.push(performer);
                    }
                } else {
                    this.logger.info(`No data available for ${performer.Symbol}`);
                }
            } catch (error) {
                this.logger.errorMessage(`Failed to fetch real-time data for ${performer.Symbol}: ${error}`);
            }
        }

        return eligiblePerformers;
    }

    async publishBestPerformers(performers: PriceAnalysis[]): Promise<void> {
        if (performers.length === 0) {
            return;
        }

        const message = this.messageFormatter.formatBestPerformersMessage(performers);
        
        this.logger.info(`Publishing to SNS topic`);
        await this.snsClient.publishCommand({
            Subject: '📈 Best Performers',
            Message: message
        });
        
        this.logger.info('SNS message published successfully');
    }
}
