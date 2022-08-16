class ErrorHandler extends Error {
    statusCode: any;
    constructor(statusCode: any, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default ErrorHandler;