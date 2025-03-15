import express from "express";
import {
  getListRows,
  createListRow,
  updateListRows,
  deleteListRows,
  copyListRows,
  resetListRows
} from "../controllers/listRowController.js";

const router = express.Router();

router.get('/:list_id', getListRows);

router.post('/:list_id', createListRow);

router.patch('/copy/:list_id', copyListRows);

router.patch('/reset/:list_id', resetListRows);

router.patch('/:list_id', updateListRows);

router.delete('/:list_id', deleteListRows);

export default router;
