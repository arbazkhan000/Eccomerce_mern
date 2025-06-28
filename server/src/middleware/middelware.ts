import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables");
}

const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
            return;
        }

        const token = authHeader.split(" ")[1];

        const decode = await jwt.verify(token, SECRET_KEY) as {
            id: string;
            role?: string;
        };
        
        // console.log("Decoded token:", decode);
        // console.log("Decoded token type:", typeof decode);

        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token",
        });
        return;
    }
};

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.role !== "admin") {
        res.status(403).json({
            success: false,
            message: "Access denied: Admins only",
        });
        return;
    }
    next();
};

export { isAdmin, protect };

