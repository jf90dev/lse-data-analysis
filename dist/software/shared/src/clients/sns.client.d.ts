import { PublishCommandOutput } from "@aws-sdk/client-sns";
export declare class SnsClient {
    private client;
    private readonly topicArn;
    constructor();
    publishCommand(options: any): Promise<PublishCommandOutput>;
}
