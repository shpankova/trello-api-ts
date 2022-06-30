import { Router } from "express";
import controller from "../controllers/cardController";
const router = Router();

router.post("/cards", controller.createCard);
router.get("/cards/:id", controller.findCardById);
router.put("/cards/:id", controller.updateCardById);
router.delete("/cards/:id", controller.deleteCardById);

export default router;
