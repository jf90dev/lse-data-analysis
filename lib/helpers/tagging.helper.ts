import {Construct} from "constructs";
import { Tags} from "aws-cdk-lib";

import { AwsTags } from "@lib/constants/aws-tags.constant";

export class TaggingHelpers {
    static tagResource(resource: Construct) {

        for (const x in AwsTags) {
            Tags.of(resource).add(x, AwsTags[x]);
        }
    }
}