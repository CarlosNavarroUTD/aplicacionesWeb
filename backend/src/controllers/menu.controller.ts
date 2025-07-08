import { Request, Response } from "express";
import { Menu } from "../models/Menu"; // Importa el modelo correcto

import { User } from "../models/User"; // Importa el modelo de usuario

// ========== CONTROLADORES MENU ==========
export const getMenuByRol = async (req: Request, res: Response) => {
    try {
        const { rol } = req.params; // Assuming 'rol' is passed as a route parameter
        const menuList = await Menu.find({ roles: { $in: [rol] } }); // Filtra por roles que incluyan el rol
        return res.json({ menuList });
    } catch (error) {
        console.error("Error en getMenuByRol:", error);
        return res.status(500).json({ error: "Error al obtener el menú por rol" });
    }
};


// ========== CONTROLADORES MENU ==========
export const getMenuByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params; // Obtén el ID del usuario desde los parámetros de la ruta

        // Busca el usuario por su ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Usa el rol del usuario para filtrar los ítems del menú
        const menuList = await Menu.find({ roles: { $in: [user.role] } });
        return res.json({ menuList });
    } catch (error) {
        console.error("Error en getMenuByUserId:", error);
        return res.status(500).json({ error: "Error al obtener el menú por usuario" });
    }
};