import { Request, Response } from "express"
import { Order } from '../models/Order'
import {generateAccessToken} from '../utils/generateToken'
import {cache} from '../utils/cache'
import dayjs from "dayjs"
import { User } from "../models/User"
import bcrypt from "bcrypt";
import { Product } from "../models/Product"




export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orderList = await Order.find()
            .populate('userId', 'username email')
            .populate('products.productId', 'name price');
        return res.json({ orderList });
    } catch (error) {
        console.log("Error en getAllOrders:", error);
        return res.status(500).json({ error: "Error al obtener órdenes" });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate('userId', 'username email')
            .populate('products.productId', 'name price');
        
        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }
        
        return res.json({ order });
    } catch (error) {
        console.log("Error en getOrderById:", error);
        return res.status(500).json({ error: "Error al obtener orden" });
    }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId })
            .populate('userId', 'username email')
            .populate('products.productId', 'name price');
        
        return res.json({ orders });
    } catch (error) {
        console.log("Error en getOrdersByUserId:", error);
        return res.status(500).json({ error: "Error al obtener órdenes del usuario" });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, products, totalAmount, deliveryDate } = req.body;

        // Verificar que el usuario existe
        const user = await User.findOne({ _id: userId, status: true });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar que todos los productos existen
        for (const item of products) {
            const product = await Product.findOne({ _id: item.productId, status: true });
            if (!product) {
                return res.status(404).json({ 
                    message: `Producto con ID ${item.productId} no encontrado` 
                });
            }
        }

        const newOrder = new Order({
            userId,
            products,
            totalAmount,
            deliveryDate,
            status: 'pending'
        });

        const order = await newOrder.save();
        const populatedOrder = await Order.findById(order._id)
            .populate('userId', 'username email')
            .populate('products.productId', 'name price');

        return res.json({ order: populatedOrder });

    } catch (error) {
        console.log("Error en createOrder:", error);
        return res.status(500).json({ error: "Error al crear orden" });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { products, totalAmount, status, deliveryDate } = req.body;

        const order = await Order.findByIdAndUpdate(
            id,
            { products, totalAmount, status, deliveryDate },
            { new: true }
        )
        .populate('userId', 'username email')
        .populate('products.productId', 'name price');

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        return res.json({ order });
    } catch (error) {
        console.log("Error en updateOrder:", error);
        return res.status(500).json({ error: "Error al actualizar orden" });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                message: "Estado inválido", 
                validStatuses 
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )
        .populate('userId', 'username email')
        .populate('products.productId', 'name price');

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        return res.json({ order });
    } catch (error) {
        console.log("Error en updateOrderStatus:", error);
        return res.status(500).json({ error: "Error al actualizar estado de orden" });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndUpdate(
            id,
            { deleteDate: new Date() },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        return res.json({ message: "Orden eliminada exitosamente" });
    } catch (error) {
        console.log("Error en deleteOrder:", error);
        return res.status(500).json({ error: "Error al eliminar orden" });
    }
};