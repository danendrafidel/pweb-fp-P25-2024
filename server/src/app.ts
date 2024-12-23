import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routes/authRoutes";
import itemsRoutes from "./routes/itemsRoutes";
import borrowItemsRouter from "./routes/borrowItemsRoutes";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api", borrowItemsRouter);

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
