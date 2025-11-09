"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LseBestPerformersLambdaStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const path = require('path');
class LseBestPerformersLambdaStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const newsAnalysisNotificationTopicArn = aws_cdk_lib_1.Fn.importValue(`NewsAnalysisTopicArn`);
        const iamSnsPolicyStatement = new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
            actions: [
                "sns:Publish"
            ],
            resources: [
                newsAnalysisNotificationTopicArn
            ]
        });
        const environment = {
            NODE_OPTIONS: '--enable-source-maps',
            LOG_LEVEL: 'INFO',
            MONGODB_CONNECTION_STRING: props.mongoDbConnectionString,
            SNS_TOPIC_ARN: newsAnalysisNotificationTopicArn
        };
        const lseBestPerformersLambdaFunction = new aws_cdk_lib_1.aws_lambda_nodejs.NodejsFunction(this, `LseBestPerformersLambdaFunction`, {
            functionName: `LseBestPerformersLambdaFunction`,
            architecture: props.lambdaArchitecture ? props.lambdaArchitecture : aws_cdk_lib_1.aws_lambda.Architecture.ARM_64,
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_20_X,
            entry: path.join(__dirname, '../../software/lambda/lse-best-performers/src/index.ts'),
            depsLockFilePath: path.join(__dirname, '../../package-lock.json'),
            handler: 'handler',
            timeout: aws_cdk_lib_1.Duration.minutes(2),
            memorySize: 256,
            environment: environment,
            initialPolicy: [iamSnsPolicyStatement],
            bundling: {
                minify: true,
                sourceMap: true,
                sourceMapMode: aws_cdk_lib_1.aws_lambda_nodejs.SourceMapMode.INLINE
            }
        });
        // Schedule to run daily at 9 AM London time
        // const ftse100Target = new LambdaInvoke(lseBestPerformersLambdaFunction, {
        //     input: aws_scheduler.ScheduleTargetInput.fromObject({"index": "ftse100"}),
        // });
        // const ftse100Scheduler = new aws_scheduler.Schedule(this, 'Ftse100ScheduleRule', {
        //     schedule: ScheduleExpression.cron({minute: '0', hour: '18', weekDay: 'SUN', month: '*', year: '*', timeZone: TimeZone.EUROPE_LONDON}),
        //     target: ftse100Target
        // });
        // const ftse250Target = new LambdaInvoke(lseBestPerformersLambdaFunction, {
        //     input: aws_scheduler.ScheduleTargetInput.fromObject({"index": "ftse250"}),
        // });
        // const ftse250Scheduler = new aws_scheduler.Schedule(this, 'Ftse250ScheduleRule', {
        //     schedule: ScheduleExpression.cron({minute: '0', hour: '18', weekDay: 'SAT', month: '*', year: '*', timeZone: TimeZone.EUROPE_LONDON}),
        //     target: ftse250Target
        // });
    }
}
exports.LseBestPerformersLambdaStack = LseBestPerformersLambdaStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHNlLWJlc3QtcGVyZm9ybWVycy1sYW1iZGEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvYXBwL2xzZS1iZXN0LXBlcmZvcm1lcnMtbGFtYmRhLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZDQVFxQjtBQUtyQixpREFBOEQ7QUFFOUQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBTzVCLE1BQWEsNEJBQTZCLFNBQVEsbUJBQUs7SUFFbkQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF3QztRQUM5RSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUV2QixNQUFNLGdDQUFnQyxHQUFHLGdCQUFFLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQUE7UUFFL0UsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLHlCQUFlLENBQUM7WUFDOUMsTUFBTSxFQUFFLGdCQUFNLENBQUMsS0FBSztZQUNwQixPQUFPLEVBQUU7Z0JBQ0wsYUFBYTthQUNoQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxnQ0FBZ0M7YUFDbkM7U0FDSixDQUFDLENBQUM7UUFHSCxNQUFNLFdBQVcsR0FBUztZQUN0QixZQUFZLEVBQUUsc0JBQXNCO1lBQ3BDLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLHlCQUF5QixFQUFFLEtBQUssQ0FBQyx1QkFBdUI7WUFDeEQsYUFBYSxFQUFFLGdDQUFnQztTQUNsRCxDQUFBO1FBRUQsTUFBTSwrQkFBK0IsR0FDakMsSUFBSSwrQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGlDQUFpQyxFQUM1RTtZQUNJLFlBQVksRUFBRSxpQ0FBaUM7WUFDL0MsWUFBWSxFQUFFLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFBLENBQUMsQ0FBQyx3QkFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNO1lBQ2pHLE9BQU8sRUFBRSx3QkFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ3ZDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx3REFBd0QsQ0FBQztZQUNyRixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQztZQUNqRSxPQUFPLEVBQUUsU0FBUztZQUNsQixPQUFPLEVBQUUsc0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsV0FBVyxFQUFFLFdBQVc7WUFDeEIsYUFBYSxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDdEMsUUFBUSxFQUFFO2dCQUNOLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFNBQVMsRUFBRSxJQUFJO2dCQUNmLGFBQWEsRUFBRSwrQkFBaUIsQ0FBQyxhQUFhLENBQUMsTUFBTTthQUN4RDtTQUNKLENBQUMsQ0FBQztRQUVQLDRDQUE0QztRQUN4Qyw0RUFBNEU7UUFDNUUsaUZBQWlGO1FBQ2pGLE1BQU07UUFFTixxRkFBcUY7UUFDckYsNklBQTZJO1FBQzdJLDRCQUE0QjtRQUM1QixNQUFNO1FBRU4sNEVBQTRFO1FBQzVFLGlGQUFpRjtRQUNqRixNQUFNO1FBRU4scUZBQXFGO1FBQ3JGLDZJQUE2STtRQUM3SSw0QkFBNEI7UUFDNUIsTUFBTTtJQUVkLENBQUM7Q0FDSjtBQWpFRCxvRUFpRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbnN0cnVjdH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcclxuaW1wb3J0IHtcclxuICAgIGF3c19sYW1iZGEsICBcclxuICAgIFN0YWNrLCAgICAgXHJcbiAgICBEdXJhdGlvbixcclxuICAgIGF3c19zY2hlZHVsZXIsXHJcbiAgICBUaW1lWm9uZSxcclxuICAgIGF3c19sYW1iZGFfbm9kZWpzLFxyXG4gICAgRm5cclxufSBmcm9tIFwiYXdzLWNkay1saWJcIjtcclxuXHJcbmltcG9ydCB7IENvbW1vblN0YWNrUHJvcHMgfSBmcm9tIFwiQGxpYi9hcHAvbHNlLWRhdGEtYW5hbHlzaXMtY29tbW9uLXN0YWNrXCI7XHJcbmltcG9ydCB7IFNjaGVkdWxlRXhwcmVzc2lvbiB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3Mtc2NoZWR1bGVyXCI7XHJcbmltcG9ydCB7IExhbWJkYUludm9rZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3Mtc2NoZWR1bGVyLXRhcmdldHNcIjtcclxuaW1wb3J0IHsgRWZmZWN0LCBQb2xpY3lTdGF0ZW1lbnQgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWlhbVwiO1xyXG5cclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMc2VCZXN0UGVyZm9ybWVyc0xhbWJkYVN0YWNrUHJvcHMgZXh0ZW5kcyBDb21tb25TdGFja1Byb3BzIHtcclxuICAgIGxhbWJkYUFyY2hpdGVjdHVyZT86IGF3c19sYW1iZGEuQXJjaGl0ZWN0dXJlLFxyXG4gICAgbW9uZ29EYkNvbm5lY3Rpb25TdHJpbmc6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTHNlQmVzdFBlcmZvcm1lcnNMYW1iZGFTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogTHNlQmVzdFBlcmZvcm1lcnNMYW1iZGFTdGFja1Byb3BzKSB7XHJcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcylcclxuXHJcbiAgICAgICAgY29uc3QgbmV3c0FuYWx5c2lzTm90aWZpY2F0aW9uVG9waWNBcm4gPSBGbi5pbXBvcnRWYWx1ZShgTmV3c0FuYWx5c2lzVG9waWNBcm5gKVxyXG5cclxuICAgICAgICBjb25zdCBpYW1TbnNQb2xpY3lTdGF0ZW1lbnQgPSBuZXcgUG9saWN5U3RhdGVtZW50KHtcclxuICAgICAgICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1csXHJcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgIFwic25zOlB1Ymxpc2hcIlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICByZXNvdXJjZXM6IFtcclxuICAgICAgICAgICAgICAgIG5ld3NBbmFseXNpc05vdGlmaWNhdGlvblRvcGljQXJuXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTsgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGNvbnN0IGVudmlyb25tZW50IDogYW55ID0ge1xyXG4gICAgICAgICAgICBOT0RFX09QVElPTlM6ICctLWVuYWJsZS1zb3VyY2UtbWFwcycsXHJcbiAgICAgICAgICAgIExPR19MRVZFTDogJ0lORk8nLFxyXG4gICAgICAgICAgICBNT05HT0RCX0NPTk5FQ1RJT05fU1RSSU5HOiBwcm9wcy5tb25nb0RiQ29ubmVjdGlvblN0cmluZyxcclxuICAgICAgICAgICAgU05TX1RPUElDX0FSTjogbmV3c0FuYWx5c2lzTm90aWZpY2F0aW9uVG9waWNBcm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxzZUJlc3RQZXJmb3JtZXJzTGFtYmRhRnVuY3Rpb24gPVxyXG4gICAgICAgICAgICBuZXcgYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb24odGhpcywgYExzZUJlc3RQZXJmb3JtZXJzTGFtYmRhRnVuY3Rpb25gLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbk5hbWU6IGBMc2VCZXN0UGVyZm9ybWVyc0xhbWJkYUZ1bmN0aW9uYCxcclxuICAgICAgICAgICAgICAgIGFyY2hpdGVjdHVyZTogcHJvcHMubGFtYmRhQXJjaGl0ZWN0dXJlID8gcHJvcHMubGFtYmRhQXJjaGl0ZWN0dXJlOiBhd3NfbGFtYmRhLkFyY2hpdGVjdHVyZS5BUk1fNjQsXHJcbiAgICAgICAgICAgICAgICBydW50aW1lOiBhd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzIwX1gsICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSAsJy4uLy4uL3NvZnR3YXJlL2xhbWJkYS9sc2UtYmVzdC1wZXJmb3JtZXJzL3NyYy9pbmRleC50cycpLFxyXG4gICAgICAgICAgICAgICAgZGVwc0xvY2tGaWxlUGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uL3BhY2thZ2UtbG9jay5qc29uJyksXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiBEdXJhdGlvbi5taW51dGVzKDIpLFxyXG4gICAgICAgICAgICAgICAgbWVtb3J5U2l6ZTogMjU2LFxyXG4gICAgICAgICAgICAgICAgZW52aXJvbm1lbnQ6IGVudmlyb25tZW50LCAgICAgIFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFBvbGljeTogW2lhbVNuc1BvbGljeVN0YXRlbWVudF0sICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBidW5kbGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbmlmeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VNYXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlTWFwTW9kZTogYXdzX2xhbWJkYV9ub2RlanMuU291cmNlTWFwTW9kZS5JTkxJTkUgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTY2hlZHVsZSB0byBydW4gZGFpbHkgYXQgOSBBTSBMb25kb24gdGltZVxyXG4gICAgICAgICAgICAvLyBjb25zdCBmdHNlMTAwVGFyZ2V0ID0gbmV3IExhbWJkYUludm9rZShsc2VCZXN0UGVyZm9ybWVyc0xhbWJkYUZ1bmN0aW9uLCB7XHJcbiAgICAgICAgICAgIC8vICAgICBpbnB1dDogYXdzX3NjaGVkdWxlci5TY2hlZHVsZVRhcmdldElucHV0LmZyb21PYmplY3Qoe1wiaW5kZXhcIjogXCJmdHNlMTAwXCJ9KSxcclxuICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zdCBmdHNlMTAwU2NoZWR1bGVyID0gbmV3IGF3c19zY2hlZHVsZXIuU2NoZWR1bGUodGhpcywgJ0Z0c2UxMDBTY2hlZHVsZVJ1bGUnLCB7XHJcbiAgICAgICAgICAgIC8vICAgICBzY2hlZHVsZTogU2NoZWR1bGVFeHByZXNzaW9uLmNyb24oe21pbnV0ZTogJzAnLCBob3VyOiAnMTgnLCB3ZWVrRGF5OiAnU1VOJywgbW9udGg6ICcqJywgeWVhcjogJyonLCB0aW1lWm9uZTogVGltZVpvbmUuRVVST1BFX0xPTkRPTn0pLFxyXG4gICAgICAgICAgICAvLyAgICAgdGFyZ2V0OiBmdHNlMTAwVGFyZ2V0XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc3QgZnRzZTI1MFRhcmdldCA9IG5ldyBMYW1iZGFJbnZva2UobHNlQmVzdFBlcmZvcm1lcnNMYW1iZGFGdW5jdGlvbiwge1xyXG4gICAgICAgICAgICAvLyAgICAgaW5wdXQ6IGF3c19zY2hlZHVsZXIuU2NoZWR1bGVUYXJnZXRJbnB1dC5mcm9tT2JqZWN0KHtcImluZGV4XCI6IFwiZnRzZTI1MFwifSksXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc3QgZnRzZTI1MFNjaGVkdWxlciA9IG5ldyBhd3Nfc2NoZWR1bGVyLlNjaGVkdWxlKHRoaXMsICdGdHNlMjUwU2NoZWR1bGVSdWxlJywge1xyXG4gICAgICAgICAgICAvLyAgICAgc2NoZWR1bGU6IFNjaGVkdWxlRXhwcmVzc2lvbi5jcm9uKHttaW51dGU6ICcwJywgaG91cjogJzE4Jywgd2Vla0RheTogJ1NBVCcsIG1vbnRoOiAnKicsIHllYXI6ICcqJywgdGltZVpvbmU6IFRpbWVab25lLkVVUk9QRV9MT05ET059KSxcclxuICAgICAgICAgICAgLy8gICAgIHRhcmdldDogZnRzZTI1MFRhcmdldFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19