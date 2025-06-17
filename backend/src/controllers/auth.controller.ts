// ========== CONTROLADORES USUARIOS COMPLETADOS ==========
import { Request, Response } from "express";
import { generateAccessToken } from '../utils/generateToken';
import { cache } from '../utils/cache';
import dayjs from "dayjs";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const login = (req: Request, res: Response) => {
    let name: string = "Carlos";

    const { username, password } = req.body;

    if (username !== 'Admin' || password !== '123456789') {
        return res.status(401).json({
            message: "Credenciales incorrectas"
        });
    }

    const userId = 'abc123';
    const accesToken = generateAccessToken(userId);
    cache.set(userId, accesToken, 60 * 15);

    return res.json({
        message: 'login',
        accesToken
    });
};

export const getTime = (req: Request, res: Response) => {
    const { userId } = req.params;
    const ttl = cache.getTtl(userId);
    
    if (!ttl) {
        return res.status(404).json({ message: "Token no encontrado" });
    }

    const now = Date.now();
    const timeToLifeSeconds = Math.floor((ttl - now) / 1000);
    const expTime = dayjs(ttl).format('HH:mm:ss');

    return res.json({
        timeToLifeSeconds,
        expTime
    });
};

export const updateTime = (req: Request, res: Response) => {
    const { userId } = req.body;
  
    const ttl = cache.getTtl(userId);
    
    if (!ttl) {
        return res.status(404).json({ message: 'Token no encontrado o expirado' });
    }
  
    const nuevaTTLsegundos: number = 60 * 10;
    cache.ttl(userId, nuevaTTLsegundos);
  
    res.json("Actualizado con éxito");
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const userList = await User.find({ status: true });
        return res.json({ userList });
    } catch (error) {
        console.log("Error en getAllUsers:", error);
        return res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id, status: true });
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        return res.json({ user });
    } catch (error) {
        console.log("Error en getUserById:", error);
        return res.status(500).json({ error: "Error al obtener usuario" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password, email, role } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            role,
            status: true
        });

        const user = await newUser.save();
        return res.json({ user });

    } catch (error) {
        console.log("Error ocurrido en createUser:", error);
        return res.status(500).json({ error: "Error al crear el usuario" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email, role, password } = req.body;

        const updateData: any = { username, email, role };

        if (password) {
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(password, saltRounds);
        }

        const user = await User.findOneAndUpdate(
            { _id: id, status: true },
            updateData,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.json({ user });
    } catch (error) {
        console.log("Error en updateUser:", error);
        return res.status(500).json({ error: "Error al actualizar usuario" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findOneAndUpdate(
            { _id: id, status: true },
            { 
                status: false, 
                deleteDate: new Date() 
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.log("Error en deleteUser:", error);
        return res.status(500).json({ error: "Error al eliminar usuario" });
    }
};
