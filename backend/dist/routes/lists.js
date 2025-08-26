import express from "express";
import { getList, getLists, createList, updateList, updateLists, deleteLists, copyLists, } from "../controllers/listController.js";
import requireAuth from "../middlewares/requireAuth.js";
const router = express.Router();
router.use(requireAuth);
router.get('/:id', getList);
router.get('/', getLists);
router.post('/', createList);
router.patch('/copy/', copyLists);
router.patch('/:id', updateList);
router.patch('/', updateLists);
router.delete('/', deleteLists);
export default router;
//# sourceMappingURL=lists.js.map