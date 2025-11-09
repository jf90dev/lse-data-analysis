import { injectable, inject } from 'tsyringe';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

@injectable()
export class TradingService {

    private client: SNSClient;
    private readonly topicArn = process.env.PLACE_ORDER_SNS_TOPIC_ARN!;

    constructor() {
         this.client = new SNSClient({});
    }

    async placeProportionalBuyOrder(symbol: string): Promise<void> {

        const publishCommandRequest = {
            Message: JSON.stringify({
                symbol: symbol
            }),
            TopicArn: this.topicArn
        };        
        const publishCommand = new PublishCommand(publishCommandRequest);
        await this.client.send(publishCommand);

    }
}
