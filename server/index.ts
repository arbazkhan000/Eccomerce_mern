import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;





//  import
import productRoutes from './src/routes/productRoutes';
import userRoutes from "./src/routes/uerRoutes";

// routes

app.use("/api",userRoutes);
app.use("/api",productRoutes);

app.get("/", (req, res) => {
    res.send("Hello from ESM TypeScript Server!");
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
