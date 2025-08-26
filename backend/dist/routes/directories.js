import express from "express";
import { getDirectories, createDirectory, updateDirectory, deleteDirectory, } from "../controllers/directoryController.js";
import requireAuth from "../middlewares/requireAuth.js";
const router = express.Router();
router.use(requireAuth);
router.get('/', getDirectories);
router.post('/', createDirectory);
router.patch('/:id', updateDirectory);
router.delete('/:id', deleteDirectory);
export default router;
//# sourceMappingURL=directories.js.map