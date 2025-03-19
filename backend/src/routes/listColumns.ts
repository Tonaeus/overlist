import express from "express";
import {
  getListColumns,
  createListColumn,
  updateListColumn,
  deleteListColumn
} from "../controllers/listColumnController.js";
import requireAuth from "../middlewares/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.get('/:list_id', getListColumns);

router.post('/:list_id', createListColumn);

router.patch('/:list_id', updateListColumn);

router.delete('/:list_id', deleteListColumn);

export default router;
