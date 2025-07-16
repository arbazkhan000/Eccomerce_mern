export class ApiError extends Error {
    status: number;
    data?: any;

    constructor(status: number, message: string, data?: any) {
        super(message);
        this.status = status;
        this.data = data;
        // Set the prototype explicitly for instanceof checks
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static BadRequest(message = "Bad Request", data?: any) {
        return new ApiError(400, message, data);
    }

    static NotFound(message = "Not Found", data?: any) {
        return new ApiError(404, message, data);
    }

    static ValidationError(message = "Validation Error", data?: any) {
        return new ApiError(422, message, data);
    }

    static InternalServerError(message = "Internal Server Error", data?: any) {
        return new ApiError(500, message, data);
    }
    static Unauthorized(message = "Unauthorized", data?: any) {
  return new ApiError(401, message, data);
}
} 