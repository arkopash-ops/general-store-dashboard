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

// for ui 
export interface Product {
    _id: string;
    product_name: string;
    category_id?: {
        _id: string;
        category_type: string
    };
    unit_price: number;
    stock_quantity: number;
    supplier_id?: {
        _id: string;
        supplier_name: string;
        supplier_company?: { name: string }
    };
    description?: string;
}