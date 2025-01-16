import express from "express";

import { 
  getListBodies,
  getListBody,
  createListBody,
  deleteListBody,
  updateListBody,
} from "../controllers/listBodyController.js";

const router = express.Router();

router.get('/', getListBodies);

router.get('/:id', getListBody);

router.post('/', createListBody);

router.delete('/:id', deleteListBody);

router.patch('/:id', updateListBody);

export default router;
