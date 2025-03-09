import express from "express";
import { 
  getList,
  getLists,
  createList,
  updateList,
  updateLists,
  deleteLists,
} from "../controllers/listController.js";

const router = express.Router();

router.get('/:id', getList);

router.get('/', getLists);

router.post('/', createList);

router.patch('/:id', updateList);

router.patch('/', updateLists);

router.delete('/', deleteLists);

export default router;
