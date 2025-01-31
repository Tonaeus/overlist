import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import directoryRoutes from "./routes/directories.js";
import listRoutes from "./routes/lists.js";
import listHeaderRoutes from "./routes/listHeaders.js";
import listBodyRoutes from "./routes/listBodies.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const mongoUri = process.env.MONGO_URI as string;
const port = process.env.PORT as string;
const frontendUrl = process.env.FRONTEND_URL as string;

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: frontendUrl, 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
}));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/directories', directoryRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/listHeaders", listHeaderRoutes);
app.use("/api/listBodies", listBodyRoutes);

// Connect to db
mongoose.connect(mongoUri)
  .then(() => {
    // Listen for requests
    app.listen(port, () => {
      console.log('Connected to db and listening on port', port)
    });
  })
  .catch((error) => {
    console.log(error);
  });
