// routes/menu.routes.ts
import express from "express";
import { getMenuByUserId, getMenuByRol, createMenuItem } from "../controllers/menu.controller";

const router = express.Router();

router.get("/menu/user/:userId", getMenuByUserId); // ya existente
router.get("/menu/role/:rol", getMenuByRol); // ya existente
router.post("/menu", createMenuItem); // nueva ruta

export default router;
