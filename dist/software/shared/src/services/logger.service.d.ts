import { ErrorBase } from '../models/error-handling/error-base.model';
export declare class LoggerService {
    private logger;
    private logLevel;
    private correlationId;
    private taskName;
    constructor();
    info(message: string): void;
    errorMessage(message: string): void;
    error<T extends string>(error: ErrorBase<T>): void;
    debug(message: string): void;
    warn(message: string): void;
    setCorrelationId(correlationId?: string): void;
    setTaskName(taskName: string): void;
    private addCorrelationId;
    private addTaskName;
}
