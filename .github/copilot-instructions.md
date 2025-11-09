# Copilot Instructions for TypeScript Project

## Project Structure

### Entry Point
- All source code lives in the `software/lambda/<function-name>/src/` folder
- The main entry point file is `software/lambda/<function-name>/src/index.ts`
- `software/lambda/<function-name>/src/index.ts` should instantiate the dependency injection container from `software/lambda/<function-name>/src/framework/dependency-container.framework.ts`

### Folder Organization
Classes must be organized into the following folders based on their responsibility:
- `clients/` - External service clients and data source connections
- `models/` - Data models and domain entities
- `repositories/` - Data access layer (sits between services and clients)
- `services/` - Business logic layer
- `constants/` - Application constants and enums
- `interfaces/` - TypeScript interfaces and types
- `framework/` - Framework configuration (e.g., dependency injection setup)

### Naming Conventions

### File Naming
Files should follow the pattern: `<class_name>.<singular_of_folder_name>.ts`

Examples:
- `clients/mongodb.client.ts` → class `MongodbClient`
- `services/user.service.ts` → class `UserService`
- `repositories/user.repository.ts` → class `UserRepository`
- `models/user.model.ts` → class `User` (always a class, not an interface)
- `constants/api.constant.ts` → class/object `Api`
- `interfaces/user.interface.ts` → interface `IUser`

### Class Naming
Classes should generally be named in PascalCase following the pattern, unless in the exceptions category: `<ClassName><SingularOfFolderName>`

Examples:
- In `clients/` folder: `MongodbClient`, `ApiClient`, `RedisClient`
- In `services/` folder: `UserService`, `AuthService`, `EmailService`
- In `repositories/` folder: `UserRepository`, `ProductRepository`

Exceptions:
- In `models/` folder, where file name is `models/user.model.ts`, class name is `User` (must be a class with constructor)
- In `constants/` folder, where file name is `constants/api.constant.ts`, class/object name is `Api`
- In `interfaces/` folder, where file name is `interfaces/user.interface.ts`, interface name is `IUser`

## Architecture Patterns

### Layered Architecture
When implementing new features, always split code logically across layers:
1. **Service Layer** (`services/`) - Contains business logic
2. **Repository Layer** (`repositories/`) - Handles data access and transformation
3. **Client Layer** (`clients/`) - Manages external connections (databases, APIs, etc.)
4. **Model Layer** (`models/`) - Defines data structures as classes (can have methods, validation, transformation logic)
5. **Helper Layer** (`helpers/`) - Contains utility functions and classes
6. **Constants Layer** (`constants/`) - Holds application-wide constants and enums
7. **Interfaces Layer** (`interfaces/`) - Defines TypeScript interfaces and types for contracts between layers
8. **Framework Layer** (`framework/`) - Contains framework-specific configurations (e.g., dependency injection)
9. **Shared Layer** (`shared/`) - Contains code that can be reused across multiple functions or modules
10. **Pipelines Layer** (`pipelines/`) - Contains MongoDB aggregation pipelines or similar constructs

### Models vs Interfaces
- **Models** (`models/` folder): Use **classes** to represent data structures. Models can encapsulate data with business logic, validation, or transformation methods.
- **Interfaces** (`interfaces/` folder): Use **interfaces** for contracts between layers and services. Interfaces define the shape of data without implementation details.
- Use interfaces to define what external APIs should expect or return
- Use models to represent domain entities and data structures with potential behavior

### Dependency Flow
- Services depend on Repositories
- Repositories depend on Clients
- Models are used across all layers
- Helpers can be used across all layers
- Always inject dependencies rather than creating instances directly

## Dependency Injection

### TSyringe Configuration
- Use `tsyringe` for dependency injection throughout the application
- All dependency injection configuration is centralized in `framework/dependency-container.framework.ts`
- The dependency container must be instantiated in `index.ts` before any other code runs
- Use constructor injection for all dependencies
- Use the `@injectable()` decorator on all classes that need to be injected
- Use the `@inject()` decorator when you need to specify injection tokens

### Example Pattern
```typescript
// framework/dependency-container.framework.ts
import "reflect-metadata"
import { container } from 'tsyringe';
import { MongodbClient } from '../clients/mongodb.client';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';


container.register('MongodbClient', MongodbClient);
container.register('UserRepository', UserRepository);
container.register('UserService', UserService);

export const DependencyContainer = container;

```

```typescript
// index.ts
import 'reflect-metadata';
import { DependencyContainer } from "./src/framework/dependency-container.framework";


// Rest of application initialization...
```

```typescript
// services/user.service.ts
import { injectable, inject } from 'tsyringe';
import { UserRepository } from '../repositories/user.repository';

@injectable()
export class UserService {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository
  ) {}
}
```

## Implementation Guidelines

### When Creating New Features
1. **Models First**: Define data models in `models/` folder
2. **Interfaces**: Define interfaces in `interfaces/` folder if needed
3. **Clients**: Create or identify the client needed for external data sources
4. **Repositories**: Build the repository layer for data access
5. **Services**: Implement business logic in the service layer
6. **Register**: Add all new classes to the dependency injection container
7. **Wire Up**: Inject dependencies through constructors using tsyringe

### Code Organization
- Keep each class focused on a single responsibility
- Use interfaces from the `interfaces/` folder for contracts between layers
- Store configuration values in `constants/` folder
- Never instantiate dependencies manually - always use dependency injection
- Keep the dependency injection configuration in one place
- Any code that can be reused should be placed in the `shared` folder for maximum reusability

## General TypeScript Standards
- Use TypeScript strict mode
- Prefer interfaces over type aliases for object shapes
- Use async/await over promise chains
- Use PascalCase for classes and interfaces
- Use camelCase for variables, functions, and methods
- Use UPPER_SNAKE_CASE for constants that are truly constant values
- Always specify return types for functions and methods
- Avoid `any` type - use `unknown` if type is truly unknown

## Code Quality Principles
- **Keep logic readable and simple** - Favor clarity over cleverness
- Avoid complex nested conditions - break them into smaller, well-named functions
- Use descriptive variable and function names that explain intent
- Prefer explicit code over implicit behavior
- Break down complex operations into smaller, single-purpose functions
- Avoid premature optimization - write clear code first, optimize if needed
- Use early returns to reduce nesting and improve readability

## Creating New Lambda Functions

### Project Structure for Lambda Functions
Each Lambda function follows the pattern:
```
software/lambda/<function-name>/
├── src/
│   ├── index.ts                          (Entry point - handler export)
│   ├── models/                           (Data models as classes)
│   ├── interfaces/                       (Type contracts)
│   ├── repositories/                     (Data access layer)
│   ├── services/                         (Business logic layer)
│   ├── clients/                          (External service clients)
│   ├── helpers/                          (Utility functions/classes)
│   ├── constants/                        (Application constants)
│   ├── pipelines/                        (MongoDB aggregation pipelines)
│   └── framework/
│       └── dependency-container.framework.ts (DI configuration)
```

### AWS CDK Lambda Stack Pattern
Each Lambda function has a corresponding CDK stack file following the pattern: `lib/app/<function-name>-lambda-stack.ts`

#### Stack File Structure
```typescript
// lib/app/my-function-lambda-stack.ts
import { Construct } from "constructs";
import {
    aws_lambda,
    Stack,
    Duration,
    aws_lambda_nodejs,
    Fn
} from "aws-cdk-lib";
import { CommonStackProps } from "@lib/app/lse-data-analysis-common-stack";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

const path = require('path');

export interface MyFunctionLambdaStackProps extends CommonStackProps {
    lambdaArchitecture?: aws_lambda.Architecture;
    // Add other required properties (e.g., mongoDbConnectionString, apiEndpoints)
}

export class MyFunctionLambdaStack extends Stack {
    constructor(scope: Construct, id: string, props: MyFunctionLambdaStackProps) {
        super(scope, id, props);

        // 1. Define IAM policies needed for Lambda execution
        const iamPolicyStatements = new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ["sns:Publish", "dynamodb:Query"], // Add required actions
            resources: ["arn:aws:*"] // Specify actual resource ARNs
        });

        // 2. Set environment variables
        const environment: any = {
            NODE_OPTIONS: '--enable-source-maps',
            LOG_LEVEL: 'INFO',
            // Add function-specific env vars
        };

        // 3. Create Lambda function using NodejsFunction
        const myFunction = new aws_lambda_nodejs.NodejsFunction(
            this,
            `MyFunctionLambda`,
            {
                functionName: `MyFunctionLambda`,
                architecture: props.lambdaArchitecture ?? aws_lambda.Architecture.ARM_64,
                runtime: aws_lambda.Runtime.NODEJS_20_X,
                entry: path.join(__dirname, '../../software/lambda/my-function/src/index.ts'),
                depsLockFilePath: path.join(__dirname, '../../package-lock.json'),
                handler: 'handler',
                timeout: Duration.minutes(2),
                memorySize: 256,
                environment: environment,
                initialPolicy: [iamPolicyStatements],
                bundling: {
                    minify: true,
                    sourceMap: true,
                    sourceMapMode: aws_lambda_nodejs.SourceMapMode.INLINE
                }
            }
        );

        // 4. Optional: Add EventBridge/Scheduler rules, SQS triggers, etc.
    }
}
```

### Integration with Main CDK App
Update `bin/main.ts` and `dev/main.ts` to include the new Lambda stack:

```typescript
// bin/main.ts
import { MyFunctionLambdaStack } from '@lib/app/my-function-lambda-stack';

// Instantiate the common stack first
const commonStack = new CommonStack(app, 'LseDataAnalysisCommonStack', {
    ...commonStackProperties,
    ...env
});

// Create your Lambda stack and add dependency on common stack
const myFunctionStack = new MyFunctionLambdaStack(app, 'MyFunctionLambdaStack', {
    ...commonStackProperties,
    mongoDbConnectionString: mongoDbConnectionString,
    // Add other required properties
    ...env
});

// Ensure common stack is created first
myFunctionStack.addDependency(commonStack);
```

### Lambda Handler Implementation
The `index.ts` file serves as the Lambda handler entry point:

```typescript
// software/lambda/my-function/src/index.ts
import 'reflect-metadata';
import { Context, ScheduledEvent } from 'aws-lambda';
import { DependencyContainer } from './framework/dependency-container.framework';
import { MyFunctionService } from './services/my-function.service';
import { MongoDbClient } from '@shared/src/clients/mongodb.client';
import { LoggerService } from '@shared/src/services/logger.service';

export const handler = async (event: ScheduledEvent, context: Context) => {
    // Resolve dependencies from container
    const logger = DependencyContainer.resolve<LoggerService>('LoggerService');
    const mongoDbClient = DependencyContainer.resolve<MongoDbClient>('MongoDbClient');
    const myFunctionService = DependencyContainer.resolve<MyFunctionService>('MyFunctionService');

    logger.setTaskName('My-Function');
    logger.info('Lambda function started');

    try {
        // Call service layer business logic
        const result = await myFunctionService.processData();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Processing completed',
                data: result
            })
        };
    } catch (error) {
        logger.errorMessage(`Error in lambda: ${error}`);
        throw error;
    } finally {
        await mongoDbClient.closeConnection();
        logger.info('Resources cleaned up');
    }
};
```

### NPM Scripts for Lambda Management
The following npm scripts help manage Lambda functions:

```json
{
  "scripts": {
    "deploy-my-function": "cdklocal deploy MyFunctionLambdaStack -a \"npx ts-node -r tsconfig-paths/register dev/main.ts\" --require-approval never --method=direct",
    "delete-my-function": "cdklocal -a \"npx ts-node -r tsconfig-paths/register dev/main.ts\" destroy MyFunctionLambdaStack --force",
    "update-my-function": "npm run set-local-creds && npm run delete-my-function && npm run deploy-my-function"
  }
}
```

### Step-by-Step Checklist for New Lambda Functions
1. **Create Lambda Source Code** in `software/lambda/<function-name>/src/`
   - Follow the layered architecture pattern
   - Use dependency injection via tsyringe
   - Import shared clients and services from `@shared`

2. **Create CDK Stack File** at `lib/app/<function-name>-lambda-stack.ts`
   - Extend `CommonStackProps`
   - Define IAM policies specific to the function
   - Use `aws_lambda_nodejs.NodejsFunction` for TypeScript support
   - Set proper timeout and memory based on requirements

3. **Update Main CDK App Files**
   - Add import for new stack in `bin/main.ts`
   - Add import for new stack in `dev/main.ts` (if using local development)
   - Instantiate stack and add dependency on `CommonStack`

4. **Add NPM Scripts** for deployment management
   - Deploy script for deploying the function
   - Delete script for removing the function
   - Update script for updating/redeploying

5. **Environment Variables**
   - Define all required env vars in the Lambda stack
   - Use `process.env` in constants files for access
   - Document environment variable requirements

6. **Testing**
   - Create integration tests in `test/` folder
   - Test handler with actual AWS Lambda environment (LocalStack)
   - Verify IAM permissions are correct

### Shared Resources
All Lambda functions should leverage shared code:
- `@shared/src/clients/` - MongoDB, SNS, HTTP clients
- `@shared/src/services/logger.service.ts` - Logging service
- `@shared/src/models/` - Shared error models and utilities

```
