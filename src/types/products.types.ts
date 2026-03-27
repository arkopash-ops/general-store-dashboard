import { Document, ObjectId } from "mongoose";

export interface IProduct {
    product_name: string;
    category_id: ObjectId;
    unit_price: number;
    stock_quantity: number;
    supplier_id: ObjectId;
    description?: string;
}

export interface ProductDocument extends IProduct, Document { }
