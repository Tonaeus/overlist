import express from "express";
import {
  getListColumns,
  createListColumn,
  updateListColumn,
  deleteListColumn
} from "../controllers/listColumnController.js";

const router = express.Router();

router.get('/:list_label', getListColumns);

router.post('/:list_label', createListColumn);

router.patch('/:list_label', updateListColumn);

router.delete('/:list_label', deleteListColumn);

export default router;
