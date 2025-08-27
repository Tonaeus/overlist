import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import directoryRoutes from "./routes/directories.js";
import listRoutes from "./routes/lists.js";
import listColumnRoutes from "./routes/listColumns.js";
import listRowRoutes from "./routes/listRows.js";
import userRoutes from "./routes/user.js";

import { FRONTEND_URL, MONGO_URI, PORT } from "./configs/dotenvConfig.js";

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: FRONTEND_URL, 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/directories', directoryRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/list-columns", listColumnRoutes);
app.use("/api/list-rows", listRowRoutes);
app.use("/api/user", userRoutes);

// Connect to db
mongoose.connect(MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(PORT, () => {
      console.log('Connected to db and listening on port', PORT)
    });
  })
  .catch((error) => {
    console.log(error);
  });
