import z from "zod";

const userCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const userLoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const productCreateValidation = z.object({
    title: z.string().min(1, "Title is required"),
    category: z.enum([
        "All",
        "Electronics",
        "Footwear",
        "Accessories",
        "Bags",
        "Fashion",
        "Mobiles & Tablets",
    ]),
    price: z
        .string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val > 0, {
            message: "Price must be a positive number",
        }),
    description: z.string().min(1, "Description is required"),
    stock: z
        .string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val >= 1 && val <= 20, {
            message: "Stock must be between 1 and 20",
        }),
});

export { productCreateValidation, userCreateSchema, userLoginSchema };
