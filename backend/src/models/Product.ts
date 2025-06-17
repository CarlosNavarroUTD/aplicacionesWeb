// ========== MODELO PRODUCT CORREGIDO ==========
import { Document, Types, Schema, model } from 'mongoose';

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    qty: string;
    status: boolean;
    price: string;
    createDate: Date;
    deleteDate: Date;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    qty: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    price: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date
    }
});

export const Product = model<IProduct>('Product', productSchema, 'product');
