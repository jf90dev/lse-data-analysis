import { Construct } from "constructs";
import { IVpc } from "aws-cdk-lib/aws-ec2";
export declare enum VpcVersion {
    version1 = 0,
    version2 = 1
}
export interface getExistingVpcProps {
    version?: VpcVersion;
    environmentName: string;
    privateSubnetNames?: string[];
    publicSubnetNames?: string[];
    availabilityZones?: string[];
}
export interface getExistingVpcLookupProps {
    version?: VpcVersion;
    environmentName: string;
}
export declare class VpcHelpers {
    static getExistingVpcLookup(scope: Construct, id: string, props: getExistingVpcLookupProps): IVpc;
    static getExistingVpc(scope: Construct, id: string, props: getExistingVpcProps): IVpc;
    static getExistingVpcv2(scope: Construct, id: string, props: getExistingVpcProps): IVpc;
    static getExistingVpcv1(scope: Construct, id: string, props: getExistingVpcProps): IVpc;
}
