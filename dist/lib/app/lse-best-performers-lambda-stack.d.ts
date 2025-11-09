import { Construct } from "constructs";
import { aws_lambda, Stack } from "aws-cdk-lib";
import { CommonStackProps } from "@lib/app/lse-data-analysis-common-stack";
export interface LseBestPerformersLambdaStackProps extends CommonStackProps {
    lambdaArchitecture?: aws_lambda.Architecture;
    mongoDbConnectionString: string;
}
export declare class LseBestPerformersLambdaStack extends Stack {
    constructor(scope: Construct, id: string, props: LseBestPerformersLambdaStackProps);
}
