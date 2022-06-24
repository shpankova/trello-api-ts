import { Router } from "express";
const router = Router();
import controller from "../controllers/cardController";


router.post('/cards', controller.createCard);
router.get('/cards/:id', controller.findCardById);
router.put('/cards/:id', controller.updateCardById)
router.delete('/cards/:id', controller.deleteCardById);

export default router;
