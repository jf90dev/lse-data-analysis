#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { SetupStack } from './set-up-stack';
import { AwsAccount } from '@lib/constants/aws-account.constants';
import { AwsRegion } from '@lib/constants/aws-region.constants';

const env = { env: { account: AwsAccount.localstack, region: AwsRegion.localstack } };
    
const app = new cdk.App();

const setupStack = new SetupStack(app, 'SetupStack', {...env});