import { Document, Types, Schema, model } from 'mongoose';

interface OrderProduct{
    productoId:Types.ObjectId;
    quantity:number;
    price:number;
}
export interface Order extends Document {
    _id:Types.ObjectId;
    userId:string;
    total:number;
    subtotal:number;
    status:boolean;
    createDate:Date;
    updateDate:Date;
    products: OrderProduct[];
}

const OrderProductSchema = new Schema<OrderProduct>({
    productoId:{
        type: Schema.Types.ObjectId,
        ref:'Product',
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min:1
    },
    price:{
        type:Number,
        required:true,
        min:0
    }
}, {_id:false} );

const orderSchema = new Schema<Order>({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    total:{
        type:Number,
        required:true
    },
    subtotal:{
        type:Number,
        required:true
    },
    products:{
        type:[OrderProductSchema],
        required:true,
        validate:[(array:string | any[]) =>array.length > 0, "Debe contener al menos un producto"]
    },
    status:{
        type:Boolean,
        default:true
    },
    createDate:{
        type:Date,
        default:Date.now
    },
    updateDate:{
        type:Date
    }
});

export const User = model<Order>('Order',orderSchema, 'rder');