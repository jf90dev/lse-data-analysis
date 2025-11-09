import {Construct} from "constructs";
import {
    aws_logs,
    CfnOutput,
    Duration,
    Stack,  
    StackProps,   
    RemovalPolicy,
    aws_sns,
    aws_dynamodb,
    aws_s3
} from "aws-cdk-lib";

import * as subscriptions from "aws-cdk-lib/aws-sns-subscriptions";

export interface CommonStackProps extends StackProps {}

export class CommonStack extends Stack {
    constructor(scope: Construct, id: string, props: CommonStackProps) {
        super(scope, id, props)

        

        const emailNotificationTopic = new aws_sns.Topic(this, 'EmailNotificationSNSTopic', {
            topicName: 'EmailNotificationTopic'
        });

        emailNotificationTopic.addSubscription(new subscriptions.EmailSubscription("jf-ftse100-alerts@outlook.com"))

        new CfnOutput(this, 'EmailNotificationTopicArn', {
            exportName: `EmailNotificationTopicArn`,
            value: emailNotificationTopic.topicArn
        });

    }
}