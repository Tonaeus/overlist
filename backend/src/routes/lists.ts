import express from "express";

import { 
  getLists,
  getList,
  createList,
  deleteList,
  updateList,
} from "../controllers/listController.js";

const router = express.Router();

router.get('/', getLists);

router.get('/:id', getList);

router.post('/', createList);

router.delete('/:id', deleteList);

router.patch('/:id', updateList);

export default router;
