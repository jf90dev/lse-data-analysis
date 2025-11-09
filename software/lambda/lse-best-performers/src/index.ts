import 'reflect-metadata';
import { DependencyContainer } from './framework/dependency-container.framework';
import { PerformanceService } from './services/performance.service';
import { MongoDbClient } from '@shared/src/clients/mongodb.client';
import { LoggerService } from '@shared/src/services/logger.service';

export const handler = async (event: any) => {
    // Resolve dependencies from container
    const logger = DependencyContainer.resolve<LoggerService>('LoggerService');
    const mongoDbClient = DependencyContainer.resolve<MongoDbClient>('MongoDbClient');
    const performanceService = DependencyContainer.resolve<PerformanceService>('PerformanceService');

    try {

        const indexType = event.index || 'ftse100';

        const performers = await performanceService.analyzeBestPerformers(indexType);

        if (performers.length > 0) {
            await performanceService.publishBestPerformers(performers);
        }

    } catch (error) {
        logger.errorMessage(`Error in best performers lambda: ${error}`);
        throw error;
    } finally {
        await mongoDbClient.closeConnection();
        logger.info('MongoDB connection closed');
    }
};
