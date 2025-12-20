class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.stack = stack || undefined;
        this.success = false;
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            error: this.error?.message || this.error,
            success: this.success,
        };
    }
}

export { ApiError };
