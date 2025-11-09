import * as mongoDB from 'mongodb';
import { MongoDbError } from '../models/error-handling/mongodb-error.model';

export class MongoDbClient {

    private readonly connectionString: string = process.env.MONGODB_CONNECTION_STRING!;
    private readonly databaseName: string = 'lse'
    private client: mongoDB.MongoClient;

    constructor() {
        this.client = new mongoDB.MongoClient(this.connectionString);
    }

    async findOne<T extends mongoDB.BSON.Document>(collectionName: string, filter: mongoDB.Filter<T>): Promise<mongoDB.WithId<T> | null> {
    
            let result: mongoDB.WithId<T> | null = null;
            try {

                const database = this.client.db(this.databaseName);
                const collection = database.collection<T>(collectionName);
                result = await collection.findOne(filter);
                return result;

            } catch (error: any) {

                throw new MongoDbError({message: `${error.message} - collectionName=${collectionName}, filter=${JSON.stringify(filter)}`});

            }  
    
    }

    async aggregate<T extends mongoDB.BSON.Document>(collectionName: string, pipeline: mongoDB.BSON.Document[]): Promise<mongoDB.WithId<T>[] | null> {
        
        const database = this.client.db(this.databaseName);
        const collection = database.collection<T>(collectionName);

        
        try {

            const options: mongoDB.FindOptions = { allowDiskUse: true, batchSize: 1000 }
            const result = new Array<mongoDB.WithId<T>>();
            const cursor = await collection.aggregate(pipeline, options);
            
            while (await cursor.hasNext()) {
                const doc = await cursor.next();

                if (doc !== null) {
                    result.push(doc as mongoDB.WithId<T>);
                }
            }

            cursor.close();

            return result;

        } catch (error: any) {

            throw new MongoDbError({message: `${error.message} - collectionName=${collectionName}, pipeline=${JSON.stringify(pipeline)}`});

        }
    }

    async findOneById<T extends mongoDB.BSON.Document>(collectionName: string, _id: string): Promise<mongoDB.WithId<T> | null> {

        try {
            const objectId = new mongoDB.ObjectId(_id);
            const filter: mongoDB.Filter<mongoDB.BSON.Document> = { _id: objectId } as mongoDB.Filter<mongoDB.BSON.Document>;

            return await this.findOne<T>(collectionName, filter);
        } catch (error: any) {

            throw new MongoDbError({message: `${error.message} - collectionName=${collectionName}, _id=${_id}`});

        }
    }

    async find<T extends mongoDB.BSON.Document>(collectionName: string, filter: mongoDB.Filter<mongoDB.BSON.Document>, useCursor: boolean = false): Promise<mongoDB.WithId<T>[]> {

        const database = this.client.db(this.databaseName);
        const collection = database.collection<T>(collectionName);
        
        try {

            if (useCursor) {

                const options: mongoDB.FindOptions = { allowDiskUse: true, batchSize: 1000 };

                const cursor = await collection.find(filter, options);
                const result: mongoDB.WithId<T>[] = [];

                while (await cursor.hasNext()) {
                    const doc = await cursor.next();
                    if (doc !== null) {
                        result.push(doc as mongoDB.WithId<T>);
                    }
                }

                cursor.close();
                return result;
            } else {
                const options: mongoDB.FindOptions = { allowDiskUse: false, batchSize: 100 };
                return await collection.find(filter).toArray();
            }

        } catch (error: any) {

            throw new MongoDbError({message: `${error.message} - collectionName=${collectionName}, filter=${JSON.stringify(filter)}`});

        }

    }

    async insertOne<T extends mongoDB.BSON.Document>(collectionName: string, document: mongoDB.OptionalUnlessRequiredId<T>) {
        try {

            const database = this.client.db(this.databaseName);
            const collection = database.collection<T>(collectionName);
            return await collection.insertOne(document);

        } catch (error: any) {

            throw new MongoDbError({message: `${error.message} - collectionName=${collectionName}, document=${JSON.stringify(document)}`});

        }
    }


    async insertMany<T extends mongoDB.BSON.Document>(collectionName: string, documents: mongoDB.OptionalUnlessRequiredId<T>[]) {
        try {

            const database = this.client.db(this.databaseName);
            const collection = database.collection<T>(collectionName);
            return await collection.insertMany(documents);

        } catch (error: any) {

            throw new MongoDbError({message: `${error.message} - collectionName=${collectionName}, documents=${JSON.stringify(documents)}`});

        }
    }
    
    async deleteOne(collectionName: string, filter: mongoDB.Filter<mongoDB.BSON.Document>) {
    
            try {

                const database = this.client.db(this.databaseName);
                const collection = database.collection(collectionName);
                return await collection.deleteOne(filter);

            } catch (error: any) {

                throw new MongoDbError({message: `${error.message} - collectionName=${collectionName}, filter=${JSON.stringify(filter)}`});

            }  
    
    }


    async deleteMany(collectionName: string, filter: mongoDB.Filter<mongoDB.BSON.Document>) {
    
            try {

                const database = this.client.db(this.databaseName);
                const collection = database.collection(collectionName);
                return await collection.deleteMany(filter);

            } catch (error: any) {

                throw new MongoDbError({message: `${error.message} - collectionName=${collectionName}, filter=${JSON.stringify(filter)}`});

            }  
    
    }

    async updateOne<T extends mongoDB.BSON.Document>(
        collectionName: string,
        filter: mongoDB.Filter<T>,
        update: mongoDB.UpdateFilter<T> | Partial<T>,
        options?: mongoDB.UpdateOptions
    ): Promise<mongoDB.UpdateResult> {

            try {

                const database = this.client.db(this.databaseName);
                const collection = database.collection<T>(collectionName);
                const set: mongoDB.UpdateFilter<T> = { $set: update } as mongoDB.UpdateFilter<T>;

                return await collection.updateOne(filter, set, options);

            } catch (error: any) {

                throw new MongoDbError({message: `${error.message} - collectionName=${collectionName}, filter=${JSON.stringify(filter)}, update=${JSON.stringify(update)}${options ? `, options=${JSON.stringify(options)}`: "" }`});

            }  


    }


    async updateOneById<T extends mongoDB.BSON.Document>(
        collectionName: string,
        _id: string,
        update: mongoDB.UpdateFilter<T> | Partial<T>,
        options?: mongoDB.UpdateOptions
    ): Promise<mongoDB.UpdateResult> {

            const objectId = new mongoDB.ObjectId(_id)
            const filter: mongoDB.Filter<T> = { _id: objectId } as mongoDB.Filter<T>;

            try {

                const database = this.client.db(this.databaseName);
                const collection = database.collection<T>(collectionName);
                const set: mongoDB.UpdateFilter<T> = { $set: update } as mongoDB.UpdateFilter<T>;

                return await collection.updateOne(filter, set, options);

            } catch (error: any) {

                throw new MongoDbError({message: `${error.message} - collectionName=${collectionName}, filter=${JSON.stringify(filter)}, update=${JSON.stringify(update)}${options ? `, options=${options}`: "" }`});

            }  


    }

    async closeConnection() {
        await this.client.close();
    }



}