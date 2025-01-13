import express from "express";

import { 
  getDirectories,
  getDirectory,
  createDirectory,
  deleteDirectory,
  updateDirectory
} from "../controllers/directoryController.js";

const router = express.Router();

router.get('/', getWorkouts);

router.get('/:id', getWorkout);

router.post('/', createWorkout);

router.delete('/:id', deleteDirectory);

router.patch('/:id', updateDirectory);

export default router; 