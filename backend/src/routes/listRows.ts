import express from "express";
import {
  getListRows,
  createListRow
} from "../controllers/listRowController.js";

const router = express.Router();

router.get('/:list_label', getListRows);

router.post('/:list_label', createListRow)

export default router;
