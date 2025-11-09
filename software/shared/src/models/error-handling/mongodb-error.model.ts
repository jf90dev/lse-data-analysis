import { ErrorBase } from "./error-base.model";

type ErrorName = 'MONGODB_ERROR';

export class MongoDbError extends ErrorBase<ErrorName> {
    constructor({message, cause }: {message: string, cause?: any}) {
        super({ name: 'MONGODB_ERROR', message, cause });
    }
}
