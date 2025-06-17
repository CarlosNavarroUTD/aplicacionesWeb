import { Request, Response } from "express"
import { Order } from '../models/Order'
import {generateAccessToken} from '../utils/generateToken'
import {cache} from '../utils/cache'
import dayjs from "dayjs"
import { User } from "../models/User"
import bcrypt from "bcrypt";



// ========== CONTROLADORES PRODUCTOS ==========
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const productList = await Product.find({ status: true });
        return res.json({ productList });
    } catch (error) {
        console.log("Error en getAllProducts:", error);
        return res.status(500).json({ error: "Error al obtener productos" });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id, status: true });
        
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        
        return res.json({ product });
    } catch (error) {
        console.log("Error en getProductById:", error);
        return res.status(500).json({ error: "Error al obtener producto" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, qty, price } = req.body;

        const newProduct = new Product({
            name,
            description,
            qty,
            price,
            status: true
        });

        const product = await newProduct.save();
        return res.json({ product });

    } catch (error) {
        console.log("Error en createProduct:", error);
        return res.status(500).json({ error: "Error al crear producto" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, qty, price } = req.body;

        const product = await Product.findOneAndUpdate(
            { _id: id, status: true },
            { name, description, qty, price },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.json({ product });
    } catch (error) {
        console.log("Error en updateProduct:", error);
        return res.status(500).json({ error: "Error al actualizar producto" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findOneAndUpdate(
            { _id: id, status: true },
            { 
                status: false, 
                deleteDate: new Date() 
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.log("Error en deleteProduct:", error);
        return res.status(500).json({ error: "Error al eliminar producto" });
    }
};
