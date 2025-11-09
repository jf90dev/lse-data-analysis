import { ErrorBase } from "./error-base.model";
type ErrorName = 'MONGODB_ERROR';
export declare class MongoDbError extends ErrorBase<ErrorName> {
    constructor({ message, cause }: {
        message: string;
        cause?: any;
    });
}
export {};
