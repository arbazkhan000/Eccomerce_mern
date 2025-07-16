import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads folder if it doesn't exist
const existingFolder = fs.existsSync("uploads");
if (!existingFolder) {
    fs.mkdirSync("uploads", { recursive: true });
}

const port = process.env.PORT || 5000;

//  import
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/uerRoutes";

// routes

app.use("/api", userRoutes);
app.use("/api", productRoutes);

app.get("/", (req, res) => {
    res.send("Hello from ESM TypeScript Server!");
});

// Error handler middleware (should be after all routes)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global error handler:", err);

    // Set default status code and message
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({
        success: false,
        message,
        error: err.stack,
    });
});

const database_url = process.env.DATABASE_URL;

if (!database_url) {
    console.error("DATABASE_URL environment variable is not set.");
    process.exit(1);
}
mongoose
    .connect(database_url)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
