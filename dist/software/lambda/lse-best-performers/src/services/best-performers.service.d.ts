import { BestPerformersRepository } from '../repositories/best-performers.repository';
import { SnsClient } from '@shared/src/clients/sns.client';
import { LoggerService } from '@shared/src/services/logger.service';
import { IBestPerformer } from '../interfaces/best-performer.interface';
import { MessageFormatterHelper } from '../helpers/message-formatter.helper';
export declare class BestPerformersService {
    private bestPerformersRepository;
    private snsClient;
    private logger;
    private messageFormatter;
    constructor(bestPerformersRepository: BestPerformersRepository, snsClient: SnsClient, logger: LoggerService, messageFormatter: MessageFormatterHelper);
    analyzeBestPerformers(): Promise<IBestPerformer[]>;
    publishBestPerformers(performers: IBestPerformer[]): Promise<void>;
}
