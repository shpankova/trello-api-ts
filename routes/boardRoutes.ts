import { Router } from "express";
import controller from "../controllers/boardController";
import roleMiddleware from "../middlewares/rolesMiddleware";
const router = Router();

router.post("/boards", roleMiddleware(["admin"]), controller.createBoard);
router.get("/boards/:id", controller.findBoardById);
router.put("/boards/:id", roleMiddleware(["admin"]), controller.updateBoardById);
router.delete("/boards/:id", roleMiddleware(["admin"]), controller.deleteBoardById);

export default router;
