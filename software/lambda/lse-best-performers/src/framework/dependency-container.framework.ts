import 'reflect-metadata';
import { container } from 'tsyringe';
import { MongoDbClient } from '@shared/src/clients/mongodb.client';
import { SnsClient } from '@shared/src/clients/sns.client';
import { EodhdClient } from '@shared/src/clients/eodhd.client';
import { LoggerService } from '@shared/src/services/logger.service';
import { PriceAnalysisRepository } from '../repositories/price-analysis.repository';
import { PerformanceService } from '../services/performance.service';
import { MessageFormatterHelper } from '../helpers/message-formatter.helper';
import { TradingService } from '../services/trading.service';

// Register all dependencies
container.register('MongoDbClient', MongoDbClient);
container.register('SnsClient', SnsClient);
container.register('EodhdClient', EodhdClient);
container.register('LoggerService', LoggerService);
container.register('MessageFormatterHelper', MessageFormatterHelper);
container.register('PriceAnalysisRepository', PriceAnalysisRepository);
container.register('PerformanceService', PerformanceService);
container.register('TradingService', TradingService);

export const DependencyContainer = container;
