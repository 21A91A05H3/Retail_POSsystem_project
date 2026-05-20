import express from "express";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("POS Inventory Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;