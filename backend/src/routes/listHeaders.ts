import express from "express";
import {
  getListHeader,
  createListHeader,
  deleteListHeader,
  updateListHeader,
} from "../controllers/listHeaderController.js";

const router = express.Router();

router.get('/:list_id', getListHeader);

router.post('/:list_id', createListHeader);

router.delete('/:id', deleteListHeader);

router.patch('/:id', updateListHeader);

export default router;
