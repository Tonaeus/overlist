import express from "express";
import mongoose from "mongoose";
import directoryRoutes from "./routes/directories.js"

const MONGO_URI = 'mongodb://root_user:root_password@localhost:27017/'; 
const PORT = 3000;

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/directories', directoryRoutes);

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
