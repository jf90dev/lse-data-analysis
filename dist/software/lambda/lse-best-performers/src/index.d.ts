import 'reflect-metadata';
import { Context, ScheduledEvent } from 'aws-lambda';
export declare const handler: (event: ScheduledEvent, context: Context) => Promise<{
    statusCode: number;
    body: string;
}>;
