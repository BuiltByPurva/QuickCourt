import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow frontend
app.use(express.json());

app.get("/api/users", (req, res) => {
    // Example data
    res.json([{ id: 1, name: "Purva" }, { id: 2, name: "Shaurya" }]);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
