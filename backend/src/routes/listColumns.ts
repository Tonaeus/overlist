import express from "express";
import {
  getListColumns,
  createListColumn,
} from "../controllers/listColumnController.js";

const router = express.Router();

router.get('/:list_label', getListColumns);

router.post('/:list_label', createListColumn);

export default router;
