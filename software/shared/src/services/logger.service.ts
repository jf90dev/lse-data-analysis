import { injectable} from 'tsyringe';
import { createLogger, Logger, format, transports } from 'winston';
import { ErrorBase } from '../models/error-handling/error-base.model';

@injectable()
export class LoggerService {
    private logger: Logger;
    private logLevel: string = process.env.LOG_LEVEL || 'info';
    private correlationId: string | null;
    private taskName: string;


    constructor() {

        const logLevels = {
            fatal: 0,
            error: 1,
            warn: 2,
            info: 3,
            debug: 4,
            trace: 5
        };



        this.logger = createLogger({
            levels: logLevels,
            level: this.logLevel,
            format: format.combine(
                format.errors({ stack: true }),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                format.printf((info: any) => `${info.level.toUpperCase()} ${info.message}`)
            ),
            transports: [
                new transports.Console()
            ]
        });
    }

    public info(message: string): void {
        this.logger.info(this.addTaskName(this.addCorrelationId(message)));
    }

    public errorMessage(message: string): void {
        this.logger.error(this.addTaskName(this.addCorrelationId(message)));
    }

    public error<T extends string>(error: ErrorBase<T>): void {
        const message = `${error.stack ? error.stack : error.message}`;
        this.logger.error(this.addTaskName(this.addCorrelationId(message)));
    }

    public debug(message: string): void {
        this.logger.debug(this.addTaskName(this.addCorrelationId(message)));
    }

    public warn(message: string): void {
        this.logger.warn(this.addTaskName(this.addCorrelationId(message)));
    }
    

    public setCorrelationId(correlationId?: string): void {
        this.correlationId = correlationId || null;
    }

    public setTaskName(taskName: string): void {
        this.taskName = taskName;
    }

    private addCorrelationId(message: string): string {
        return this.correlationId ? `[${this.correlationId}] ${message}` : message;
    }

    private addTaskName(message: string): string {
        return this.taskName ? `[${this.taskName}] ${message}` : message;
    }
}