import { Router } from "express";
import { createOrder, getOrderById, updateOrder, deleteOrder } from "../controllers/order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;