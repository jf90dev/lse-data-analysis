import { injectable, inject } from 'tsyringe';
import { MongoDbClient } from '@shared/src/clients/mongodb.client';
import { PriceAnalysis } from '../models/price-analysis.model';
import { BestPerformersPipeline } from '../pipelines/best-performers.pipeline';
import { WithId } from 'mongodb';

@injectable()
export class PriceAnalysisRepository {
    constructor(
        @inject('MongoDbClient') private mongoDbClient: MongoDbClient
    ) {}

    async findTopPerformers(indexType: string): Promise<PriceAnalysis[]> {
        const pipeline = BestPerformersPipeline.getBestPerformersPipeline();
        const results = await this.mongoDbClient.aggregate<PriceAnalysis>(
            `${indexType}_price_analysis`,
            pipeline
        );

        if (!results || results.length === 0) {
            return [];
        }

        return this.convertToPriceAnalysis(results);
    }

    private convertToPriceAnalysis(results: WithId<PriceAnalysis>[]): PriceAnalysis[] {
        return results.map(result => {
            // Destructure to exclude _id and create a plain PriceAnalysis object
            const { _id, ...priceAnalysisData } = result;
            return priceAnalysisData as PriceAnalysis;
        });
    }

}
