import express from "express";
import {
  getListColumns,
  createListColumn,
  updateListColumn
} from "../controllers/listColumnController.js";

const router = express.Router();

router.get('/:list_label', getListColumns);

router.post('/:list_label', createListColumn);

router.patch('/:list_label', updateListColumn);

export default router;
