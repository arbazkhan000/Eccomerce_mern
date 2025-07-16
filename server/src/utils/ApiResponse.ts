export class ApiResponse {
    static success(message: string, data?: any, meta?: any) {
        return {
            success: true,
            message,
            data: data ?? null,
            ...(meta ? { meta } : {}),
        };
    }
}
