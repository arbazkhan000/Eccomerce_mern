import z from 'zod';


const userCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),

})

 const userLoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });



  export { userCreateSchema, userLoginSchema };

