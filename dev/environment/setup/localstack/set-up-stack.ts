import { Construct } from "constructs";
import { aws_sns, CfnOutput, Stack, StackProps } from "aws-cdk-lib";

export class SetupStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const proportionalBuyOrderRequestTopic = new aws_sns.Topic(this, 'ProportionalBuyOrderRequestTopic', {
            topicName: 'TradingService-ProportionalBuyOrderRequestTopic'
        });

        
        new CfnOutput(this, 'TradingService-ProportionalBuyOrderRequestTopicArn', {
            exportName: `TradingService-ProportionalBuyOrderRequestTopicArn`,
            value: proportionalBuyOrderRequestTopic.topicArn
        });

    }
}