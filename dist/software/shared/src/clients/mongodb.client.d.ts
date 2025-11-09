import * as mongoDB from 'mongodb';
export declare class MongoDbClient {
    private readonly connectionString;
    private readonly databaseName;
    private client;
    constructor();
    findOne<T extends mongoDB.BSON.Document>(collectionName: string, filter: mongoDB.Filter<T>): Promise<mongoDB.WithId<T> | null>;
    aggregate<T extends mongoDB.BSON.Document>(collectionName: string, pipeline: mongoDB.BSON.Document[]): Promise<mongoDB.WithId<T>[] | null>;
    findOneById<T extends mongoDB.BSON.Document>(collectionName: string, _id: string): Promise<mongoDB.WithId<T> | null>;
    find<T extends mongoDB.BSON.Document>(collectionName: string, filter: mongoDB.Filter<mongoDB.BSON.Document>, useCursor?: boolean): Promise<mongoDB.WithId<T>[]>;
    insertOne<T extends mongoDB.BSON.Document>(collectionName: string, document: mongoDB.OptionalUnlessRequiredId<T>): Promise<mongoDB.InsertOneResult<T>>;
    insertMany<T extends mongoDB.BSON.Document>(collectionName: string, documents: mongoDB.OptionalUnlessRequiredId<T>[]): Promise<mongoDB.InsertManyResult<T>>;
    deleteOne(collectionName: string, filter: mongoDB.Filter<mongoDB.BSON.Document>): Promise<mongoDB.DeleteResult>;
    deleteMany(collectionName: string, filter: mongoDB.Filter<mongoDB.BSON.Document>): Promise<mongoDB.DeleteResult>;
    updateOne<T extends mongoDB.BSON.Document>(collectionName: string, filter: mongoDB.Filter<T>, update: mongoDB.UpdateFilter<T> | Partial<T>, options?: mongoDB.UpdateOptions): Promise<mongoDB.UpdateResult>;
    updateOneById<T extends mongoDB.BSON.Document>(collectionName: string, _id: string, update: mongoDB.UpdateFilter<T> | Partial<T>, options?: mongoDB.UpdateOptions): Promise<mongoDB.UpdateResult>;
    closeConnection(): Promise<void>;
}
