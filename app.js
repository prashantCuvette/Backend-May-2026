import express from "express";
import { connectDatabase } from "./src/configs/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
import userRoutes from "./src/routes/users.route.js";
app.use("/api/v1/users", userRoutes);

app.listen(4000, () => {
    console.log("Server Running on Port 4000");
});