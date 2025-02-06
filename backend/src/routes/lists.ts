import express from "express";
import { 
  getLists,
  createList,
  updateLists,
  deleteLists,
} from "../controllers/listController.js";

const router = express.Router();

router.get('/', getLists);

router.post('/', createList);

router.patch('/', updateLists);

router.delete('/', deleteLists);

export default router;
