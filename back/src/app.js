import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import propertyRouter from "./routes/property.route.js";
import tenantRouter from "./routes/tenant.routes.js";
import requestRouter from "./routes/request.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// For ESM modules, __dirname is not defined, so we need to define it manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoURI = 'mongodb+srv://linoynoe1412:bewwTMGBW26ySwh1@cluster0.smajmyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("not connected to MongoDB");
    console.log(err);
  });

const app = express();

// Configure CORS middleware
const corsOptions = {
  origin: "https://homelink-1.onrender.com", // specify the origin explicitly
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // allow credentials
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.listen(4000, () => {
  console.log("server is running on port 4000 ");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/property", propertyRouter);
app.use("/api/tenant", tenantRouter); // Add tenant routes
app.use("/api/request", requestRouter); // Add request routes

// Serving static files from frontend/dist
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
