import {LambdaClient, InvokeCommand, InvokeCommandInput } from "@aws-sdk/client-lambda";

const lambdaFunctionName = "LseBestPerformersLambdaFunction";

describe("Lse Best Performers Lambda Integration Tests", () => {
    const client = new LambdaClient({
        region: "eu-west-1",
        endpoint: "http://localhost:4566",
        disableHostPrefix: true,
    });

    it("Should Succeed", async () => {
        const input: InvokeCommandInput = { 
            FunctionName: lambdaFunctionName, 
            LogType: "Tail",
            Payload: JSON.stringify({}),
        };
        const command = new InvokeCommand(input);        
        const response = await client.send(command);
        const statusCode = response.StatusCode;

        let payload;

        if (response.Payload != null) {
            payload = JSON.parse(Buffer.from(response.Payload).toString());
        }

        expect(statusCode).toBe(200);        
        
    }, 30000);

     it("Should Succeed for Ftse250", async () => {
        const input: InvokeCommandInput = { 
            FunctionName: lambdaFunctionName, 
            LogType: "Tail",
            Payload: JSON.stringify({ index: 'ftse250' }),
        };
        const command = new InvokeCommand(input);        
        const response = await client.send(command);
        const statusCode = response.StatusCode;

        let payload;

        if (response.Payload != null) {
            payload = JSON.parse(Buffer.from(response.Payload).toString());
        }

        expect(statusCode).toBe(200);        
        
    }, 30000);


});
