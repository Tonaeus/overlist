import express from "express";
import {
  getListHeaders,
  getListHeader,
  createListHeader,
  deleteListHeader,
  updateListHeader,
} from "../controllers/listHeaderController.js";

const router = express.Router();

router.get('/', getListHeaders);

router.get('/:id', getListHeader);

router.post('/', createListHeader);

router.delete('/:id', deleteListHeader);

router.patch('/:id', updateListHeader);

export default router;
