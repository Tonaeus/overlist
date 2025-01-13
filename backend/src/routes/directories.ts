import express from "express";

import { 
  getDirectories,
  getDirectory,
  createDirectory,
  deleteDirectory,
  updateDirectory,
} from "../controllers/directoryController.js";

const router = express.Router();

router.get('/', getDirectories);

router.get('/:id', getDirectory);

router.post('/', createDirectory);

router.delete('/:id', deleteDirectory);

router.patch('/:id', updateDirectory);

export default router; 