import express from "express";
import {
  getListColumns,
  createListColumn,
} from "../controllers/listColumnController.js";

const router = express.Router();

router.get('/:list_id', getListColumns);

router.post('/:list_id', createListColumn);

export default router;
