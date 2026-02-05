import express, { Express } from "express";

// import Routes modules
import healthRoutes from "././api/v1/routes/healthRoutes";
import userRoutes from "././api/v1/routes/userRoutes";

// Initialize Express application
const app: Express = express();
app.use(express.json());

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// router handler
// router defined in health routes, prefixed with /api/v1
app.use("/api/v1", healthRoutes);
app.use("/api/v1", userRoutes);

export default app;