import { ErrorBase } from './error-base.model';
type ErrorName = 'GLOBAL_ERROR';
export declare class GlobalError extends ErrorBase<ErrorName> {
    constructor({ message, cause }: {
        message: string;
        cause?: any;
    });
}
export {};
