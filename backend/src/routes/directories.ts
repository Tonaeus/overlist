import express from "express";
import { 
  getDirectories,
  createDirectory,
  updateDirectory,
  deleteDirectory,
} from "../controllers/directoryController.js";

const router = express.Router();

router.get('/', getDirectories);

router.post('/', createDirectory);

router.patch('/:id', updateDirectory);

router.delete('/:id', deleteDirectory);

export default router; 