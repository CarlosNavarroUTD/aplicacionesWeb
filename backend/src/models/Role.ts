import { Document, Types, Schema, model } from 'mongoose';

export interface Role extends Document {
    _id:Types.ObjectId;
    name:string;
    type:string;
    status:boolean;
}

const roleSchema = new Schema<Role>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    }
});

export const User = model<Role>('Role',roleSchema, 'role');