import {Construct} from "constructs";
import {
    aws_lambda,  
    Stack,     
    Duration,
    aws_scheduler,
    TimeZone,
    aws_lambda_nodejs,
    Fn
} from "aws-cdk-lib";

import { CommonStackProps } from "@lib/app/lse-data-analysis-common-stack";
import { ScheduleExpression } from "aws-cdk-lib/aws-scheduler";
import { LambdaInvoke } from "aws-cdk-lib/aws-scheduler-targets";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

const path = require('path')

export interface LseBestPerformersLambdaStackProps extends CommonStackProps {
    lambdaArchitecture?: aws_lambda.Architecture,
    mongoDbConnectionString: string
}

export class LseBestPerformersLambdaStack extends Stack {

    constructor(scope: Construct, id: string, props: LseBestPerformersLambdaStackProps) {
        super(scope, id, props)

        const emailNotificationTopicArn = Fn.importValue(`EmailNotificationTopicArn`)
        const placeOrderTopicArn = Fn.importValue(`TradingService-ProportionalBuyOrderRequestTopicArn`)


        const iamSnsPolicyStatement = new PolicyStatement({
            effect: Effect.ALLOW,
            actions: [
                "sns:Publish"
            ],
            resources: [
                emailNotificationTopicArn,
                placeOrderTopicArn
            ]
        });       
        

        const environment : any = {
            NODE_OPTIONS: '--enable-source-maps',
            LOG_LEVEL: 'info',
            MONGODB_CONNECTION_STRING: props.mongoDbConnectionString,
            SNS_TOPIC_ARN: emailNotificationTopicArn,
            PLACE_ORDER_SNS_TOPIC_ARN: placeOrderTopicArn
        }

        const lseBestPerformersLambdaFunction =
            new aws_lambda_nodejs.NodejsFunction(this, `LseBestPerformersLambdaFunction`,
            {
                functionName: `LseBestPerformersLambdaFunction`,
                architecture: props.lambdaArchitecture ? props.lambdaArchitecture: aws_lambda.Architecture.ARM_64,
                runtime: aws_lambda.Runtime.NODEJS_20_X,                        
                entry: path.join(__dirname ,'../../software/lambda/lse-best-performers/src/index.ts'),
                depsLockFilePath: path.join(__dirname, '../../package-lock.json'),
                handler: 'handler',
                timeout: Duration.minutes(2),
                memorySize: 256,
                environment: environment,      
                initialPolicy: [iamSnsPolicyStatement],                  
                bundling: {
                    minify: true,
                    sourceMap: true,
                    sourceMapMode: aws_lambda_nodejs.SourceMapMode.INLINE                    
                }                 
            });

        // Schedule to run daily at 9 AM London time
            const ftse100Target = new LambdaInvoke(lseBestPerformersLambdaFunction, {
                input: aws_scheduler.ScheduleTargetInput.fromObject({"index": "ftse100"}),
            });

            const ftse100Scheduler = new aws_scheduler.Schedule(this, 'Ftse100ScheduleRule', {
                schedule: ScheduleExpression.cron({minute: '0', hour: '9', weekDay: 'MON-FRI', month: '*', year: '*', timeZone: TimeZone.EUROPE_LONDON}),
                target: ftse100Target
            });

            const ftse250Target = new LambdaInvoke(lseBestPerformersLambdaFunction, {
                input: aws_scheduler.ScheduleTargetInput.fromObject({"index": "ftse250"}),
            });

            const ftse250Scheduler = new aws_scheduler.Schedule(this, 'Ftse250ScheduleRule', {
                schedule: ScheduleExpression.cron({minute: '0', hour: '9', weekDay: 'MON-FRI', month: '*', year: '*', timeZone: TimeZone.EUROPE_LONDON}),
                target: ftse250Target
            });

    }
}
