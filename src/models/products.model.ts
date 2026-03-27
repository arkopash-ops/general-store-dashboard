import { Schema, model, models } from "mongoose";
import { ProductDocument } from "@/types/products.types";

import "@/models/categories.model"
import "@/models/suppliers.models"

const ProductSchema = new Schema<ProductDocument>({
    product_name: {
        type: String,
        required: true
    },

    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    unit_price: {
        type: Number,
        required: true
    },

    stock_quantity: {
        type: Number,
        required: true
    },

    supplier_id: {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },

    description: { type: String }
}, { timestamps: true });

const productModel = models.Product ||
    model<ProductDocument>("Product", ProductSchema);

export default productModel;
