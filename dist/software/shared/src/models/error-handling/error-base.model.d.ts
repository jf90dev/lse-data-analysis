export declare class ErrorBase<T extends string> extends Error {
    name: T;
    message: string;
    cause?: any;
    constructor({ name, message, cause }: {
        name: T;
        message: string;
        cause?: any;
    });
}
