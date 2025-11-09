import { Construct } from "constructs";
import { IVpc, Vpc } from "aws-cdk-lib/aws-ec2";
import { Fn } from "aws-cdk-lib";

export enum VpcVersion {
    version1,
    version2
}

export interface getExistingVpcProps {
    version?: VpcVersion,
    environmentName: string
    privateSubnetNames?: string[]
    publicSubnetNames?: string[]
    availabilityZones?: string[]
}

export interface getExistingVpcLookupProps {
    version?: VpcVersion,
    environmentName: string
}

export class VpcHelpers {
    static getExistingVpcLookup(
        scope: Construct,
        id: string,
        props: getExistingVpcLookupProps,
    ): IVpc {
        switch (props.version) {
            case VpcVersion.version1:
                return Vpc.fromLookup(scope, 'VPC', {
                    vpcId: Fn.importValue(`${props.environmentName}VPC`),
                });
            case VpcVersion.version2:
            default:
                return Vpc.fromLookup(scope, 'VPC', {
                    vpcId: Fn.importValue(`${props.environmentName}-VpcId`),
                });
        }

    }

    static getExistingVpc(
        scope: Construct,
        id: string,
        props: getExistingVpcProps,
    ): IVpc {
        switch (props.version) {
            case VpcVersion.version1:
                return this.getExistingVpcv1(scope, id, props);
            case VpcVersion.version2:
            default:
                return this.getExistingVpcv2(scope, id, props);
        }
    }

    static getExistingVpcv2(
        scope: Construct,
        id: string,
        props: getExistingVpcProps,
    ): IVpc {
        let privateSubnetName = [
            'Application',
        ];
        let publicSubnetName = [
            'Public',
        ];
        let availabilityZones = [
            "eu-west-2a",
            "eu-west-2b",
            "eu-west-2c"
        ];
        if (props.privateSubnetNames) {
            privateSubnetName = props.privateSubnetNames;
        }
        if (props.publicSubnetNames) {
            publicSubnetName = props.publicSubnetNames;
        }
        if (props.availabilityZones) {
            availabilityZones = props.availabilityZones;
        }

        return Vpc.fromVpcAttributes(scope, id, {
            vpcId: Fn.importValue(`${props.environmentName}-VpcId`),
            availabilityZones: availabilityZones,
            privateSubnetNames: privateSubnetName,
            vpcCidrBlock: Fn.importValue(`${props.environmentName}-VpcCidr`),
            privateSubnetIds: privateSubnetName.flatMap(subnetName => {
                const rtn: string[] = []
                for (let x = 0; x < availabilityZones.length; x++) {
                    rtn.push(Fn.importValue(`${props.environmentName}-${subnetName}Subnet${x + 1}Id`))
                }
                return rtn
            }),
            privateSubnetRouteTableIds: privateSubnetName.flatMap(subnetName => {
                const rtn: string[] = []
                for (let x = 0; x < availabilityZones.length; x++) {
                    rtn.push(Fn.importValue(`${props.environmentName}-${subnetName}RouteTable${x + 1}Id`))
                }
                return rtn
            }),
            publicSubnetNames: publicSubnetName,
            publicSubnetIds: publicSubnetName.flatMap(subnetName => {
                const rtn: string[] = []
                for (let x = 0; x < availabilityZones.length; x++) {
                    rtn.push(Fn.importValue(`${props.environmentName}-${subnetName}Subnet${x + 1}Id`))
                }
                return rtn
            }),
            publicSubnetRouteTableIds: publicSubnetName.flatMap(subnetName => {
                const rtn: string[] = []
                for (let x = 0; x < availabilityZones.length; x++) {
                    rtn.push(Fn.importValue(`${props.environmentName}-${subnetName}RouteTable${x + 1}Id`))
                }
                return rtn
            }),
        });
    }

    static getExistingVpcv1(
        scope: Construct,
        id: string,
        props: getExistingVpcProps,
    ): IVpc {
        let privateSubnetName = [
            'Application',
            'Database'
        ];
        const maptoLegacyPrivateImportName: {
            [key: string]: string
        } = {
            'Application': 'App',
            'Database': 'Data'
        }

        let publicSubnetName = [
            'Public',
        ];
        let availabilityZones = [
            "eu-west-1a",
            "eu-west-1b",
            "eu-west-1c"
        ];
        if (props.privateSubnetNames) {
            privateSubnetName = props.privateSubnetNames;
        }
        if (props.publicSubnetNames) {
            publicSubnetName = props.publicSubnetNames;
        }
        if (props.availabilityZones) {
            availabilityZones = props.availabilityZones;
        }

        // noinspection UnnecessaryLocalVariableJS,JSUnusedLocalSymbols
        const vpc = Vpc.fromVpcAttributes(scope, id, {
            vpcId: Fn.importValue(`${props.environmentName}VPC`),
            vpcCidrBlock: Fn.importValue(`${props.environmentName}VPCCIDR`),
            availabilityZones: availabilityZones,
            privateSubnetNames: privateSubnetName,
            privateSubnetIds: privateSubnetName.flatMap(subnetName => {
                const rtn: string[] = []
                for (let x = 0; x < availabilityZones.length; x++) {
                    rtn.push(Fn.importValue(`${props.environmentName}Private${maptoLegacyPrivateImportName[subnetName]}Subnet${x + 1}`))
                }
                return rtn
            }),
            privateSubnetRouteTableIds: privateSubnetName.flatMap(subnetName => {
                const rtn: string[] = []
                for (let x = 0; x < availabilityZones.length; x++) {
                    rtn.push(Fn.importValue(`${props.environmentName}PrivateRouteTable${x + 1}`))
                }
                return rtn
            }),
            publicSubnetNames: publicSubnetName,
            publicSubnetIds: publicSubnetName.flatMap(subnetName => {
                const rtn: string[] = []
                for (let x = 0; x < availabilityZones.length; x++) {
                    rtn.push(Fn.importValue(`${props.environmentName}${subnetName}Subnet${x + 1}`))
                }
                return rtn
            }),
            publicSubnetRouteTableIds: publicSubnetName.flatMap(subnetName => {
                const rtn: string[] = []
                for (let x = 0; x < availabilityZones.length; x++) {
                    rtn.push(Fn.importValue(`${props.environmentName}PrivateRouteTable${x + 1}`))
                }
                return rtn
            }),
        });
        return vpc;
    }
}