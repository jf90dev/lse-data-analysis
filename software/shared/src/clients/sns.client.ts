import {PublishCommand, PublishCommandOutput, SNSClient} from "@aws-sdk/client-sns";

export class SnsClient {
    private client: SNSClient

    private readonly topicArn = process.env.SNS_TOPIC_ARN!   

    constructor() {
        this.client = new SNSClient({});
    }


    async publishCommand(
        options: any
    ): Promise<PublishCommandOutput> {
        const publishCommandRequest = {
            ...options,
            TopicArn: this.topicArn
        };        
        const publishCommand = new PublishCommand(publishCommandRequest);
        return await this.client.send(publishCommand);
    }

}
