import crypto from "crypto";
import { Request, Response } from "express";
import User from "../schema/userSchema";
import { sendVerificationToEmail } from "../utils/emailService";
import { jwtToken } from "../utils/jwtToken";
import { userCreateSchema, userLoginSchema } from "../utils/validation";

/**
 * Controller for handling user-related operations
 */
export class UserController {
    /**
     * Create a new user
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<Response>} Response with success status and user data or error message
     */
    static async create(req: Request, res: Response) {
        try {
            const parsed = userCreateSchema.safeParse(req.body);

            if (!parsed.success) {
                res.status(400).json({
                    success: false,
                    errors: parsed.error.errors,
                });
                return;
            }

            const { name, email, password } = parsed.data;

            if (!name || !email || !password) {
                res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
            }

            const user = await User.findOne({ email });

            if (user) {
                res.status(400).json({
                    success: false,
                    message: "User already exists",
                });
            }

            const verificationToken = crypto.randomBytes(20).toString("hex");

            const newUser = new User({
                name,
                email,
                password,
                verificationToken,
            });

            await newUser.save();

            const result = await sendVerificationToEmail(
                newUser.email,
                verificationToken
            );

            console.log(result);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: newUser,
            });
        } catch (error: unknown) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: (error as any).message,
            });
        }
    }

    /**
     * Login an existing user
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<Response>} Response with success status and user data or error message
     */
    static async login(req: Request, res: Response) {
        try {
            const parsed = userLoginSchema.safeParse(req.body);

            if (!parsed.success) {
                res.status(400).json({
                    success: false,
                    errors: parsed.error.errors,
                });
                return;
            }

            const { email, password } = parsed.data;

            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
            }

            const user = await User.findOne({ email });

            if (!user) {
                res.status(400).json({
                    success: false,
                    message: "User not found",
                });
                return;
            }

            if (!user.isVerified) {
                res.status(400).json({
                    success: false,
                    message: "Please verify your email before logging",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: user,
                token: await jwtToken({ id: user._id, role: user.role }),
            });
        } catch (error: unknown) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: (error as any).message,
            });
        }
    }

    /**
     * Get user profile
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<Response>} Response with success status and user profile or error message
     */
    static async profile(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
           
            
            // Check if userId is valid
            if (!userId) {
                res.status(400).json({
                    success: false,
                    message: "User ID not found in token",
                });
                return;
            }

            // Check if it's a valid MongoDB ObjectId
            const mongoose = require('mongoose');
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                res.status(400).json({
                    success: false,
                    message: "Invalid user ID format",
                });
                return;
            }
            
            const user = await User.findById(userId);
            console.log("user found:", user);

            if (!user) {
                res.status(400).json({
                    success: false,
                    message: "User not found",
                });

                return;
            }

            res.status(200).json({
                success: true,
                message: "Profile retrieved successfully",
                data: user,
            });
        } catch (error: unknown) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: (error as any).message,
            });
        }
    }

    static async verifyEmial(req: Request, res: Response) {
        try {
            const verificationToken = req.params.token;

            const user = await User.findOne({ verificationToken });

            if (!user) {
                res.status(400).json({
                    success: false,
                    message: "Invalid or expired token",
                });
                return;
            }

          
            user.isVerified = true;
            user.verificationToken = undefined; 

            const jwtTokenValue = await jwtToken(user);

            await user.save();

            res.status(200).json({
                success: true,
                message: "Email verified successfully",
                token: jwtTokenValue,
            });
        } catch (error: unknown) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: (error as any).message,
            });
        }
    }
}
