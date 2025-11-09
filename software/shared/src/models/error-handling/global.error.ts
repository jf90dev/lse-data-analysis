import { ErrorBase } from './error-base.model';

type ErrorName = 'GLOBAL_ERROR';

export class GlobalError extends ErrorBase<ErrorName> {
    constructor({message, cause} : {message: string, cause?: any}) {
        super({name: 'GLOBAL_ERROR', message, cause});
    }
}