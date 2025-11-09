import { MongoDbClient } from '@shared/src/clients/mongodb.client';
import { IBestPerformer } from '../interfaces/best-performer.interface';
export declare class BestPerformersRepository {
    private mongoDbClient;
    constructor(mongoDbClient: MongoDbClient);
    findBestPerformers(limit?: number): Promise<IBestPerformer[]>;
    private transformToBestPerformers;
}
