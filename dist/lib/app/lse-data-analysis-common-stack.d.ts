import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
export interface CommonStackProps extends StackProps {
}
export declare class CommonStack extends Stack {
    constructor(scope: Construct, id: string, props: CommonStackProps);
}
