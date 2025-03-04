import express from "express";
import {
  getListRows,
  createListRow
} from "../controllers/listRowController.js";

const router = express.Router();

router.get('/:list_id', getListRows);

router.post('/:list_id', createListRow)

export default router;
