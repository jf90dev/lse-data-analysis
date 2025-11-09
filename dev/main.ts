#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { AwsAccount } from '@lib/constants/aws-account.constants';
import { AwsRegion } from '@lib/constants/aws-region.constants';

import { CommonStack, CommonStackProps } from '@lib/app/lse-data-analysis-common-stack';
import { LseBestPerformersLambdaStack } from '@lib/app/lse-best-performers-lambda-stack';

const env = { env: { account: AwsAccount.localstack, region: AwsRegion.localstack } };

const app = new cdk.App();

// const mongoDbConnectionString = 'mongodb://lse_user:lse_password@mongodb:27017/?retryWrites=true&loadBalanced=false&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256';
const mongoDbConnectionString = 'mongodb+srv://flahertyjoe90:Riadbsc%5E90@cluster0.0c5tnsn.mongodb.net/ftse100?appName=Cluster0&retryWrites=true&loadBalanced=false&replicaSet=atlas-neg8yj-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&w=majority&authSource=admin&authMechanism=SCRAM-SHA-1';


const commonStackProperties: CommonStackProps = {}

const commonStack =
    new CommonStack(app, `LseDataAnalysisCommonStack`, {
        ...commonStackProperties,     
        ...env   
    })

const lseBestPerformersLambdaStack =
    new LseBestPerformersLambdaStack(app, `LseBestPerformersLambdaStack`, {
        ...commonStackProperties,
        mongoDbConnectionString: mongoDbConnectionString,
        ...env
    })
lseBestPerformersLambdaStack.addDependency(commonStack)
