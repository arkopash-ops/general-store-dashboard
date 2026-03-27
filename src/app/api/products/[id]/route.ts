import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import productModel from "@/models/products.model";
import mongoose from "mongoose";
import { IProduct } from "@/types/products.types";

// GET PRODUCT BY ID
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDB();

        const { id } = await context.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid product ID" },
                { status: 400 }
            );
        }

        // Populate category_type and supplier details
        const product = await productModel
            .findById(id)
            .populate({
                path: "category_id",
                select: "category_type",
            })
            .populate({
                path: "supplier_id",
                select: "supplier_name supplier_company.name",
            });

        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: product });
    } catch (error: unknown) {
        let message = "Internal server error";
        if (error instanceof Error) message = error.message;

        return NextResponse.json(
            { success: false, message },
            { status: 500 }
        );
    }
}


// EDIT PRODUCT
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDB();

        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Product ID is required" },
                { status: 400 }
            );
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid product ID" },
                { status: 400 }
            );
        }

        const body: Partial<IProduct> = await req.json();
        const {
            product_name,
            category_id,
            unit_price,
            stock_quantity,
            supplier_id,
            description
        } = body;

        // Check for duplicate product_name
        if (product_name) {
            const existing = await productModel.findOne({
                product_name,
                _id: { $ne: id },
            });
            if (existing) {
                return NextResponse.json(
                    { success: false, message: "Product name already exists" },
                    { status: 400 }
                );
            }
        }

        // Build update object
        const updateData: Partial<{
            product_name: string,
            category_id: mongoose.ObjectId,
            unit_price: number,
            stock_quantity: number,
            supplier_id: mongoose.ObjectId,
            description: string
        }> = {};
        if (product_name !== undefined) updateData.product_name = product_name;
        if (category_id !== undefined) updateData.category_id = category_id;
        if (unit_price !== undefined) updateData.unit_price = unit_price;
        if (stock_quantity !== undefined) updateData.stock_quantity = stock_quantity;
        if (supplier_id !== undefined) updateData.supplier_id = supplier_id;
        if (description !== undefined) updateData.description = description;

        const product = await productModel
            .findOneAndUpdate(
                { _id: id },
                { $set: updateData },
                { returnDocument: "after" }
            )
            .populate({ path: "category_id", select: "category_type" })
            .populate({ path: "supplier_id", select: "supplier_name supplier_company.name" })
            .exec();

        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: product });
    } catch (error: unknown) {
        let message = "Internal server error";
        if (error instanceof Error) message = error.message;

        return NextResponse.json(
            { success: false, message },
            { status: 500 }
        );
    }
}


// DELETE PRODUCT
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDB();

        const { id } = await context.params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Category ID is required" },
                { status: 400 }
            );
        }

        const deletedProduct = await productModel.findOneAndDelete({ _id: id });

        if (!deletedProduct) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Product deleted",
            data: deletedProduct,
        });
    } catch (error: unknown) {
        let message = "Internal server error";
        if (error instanceof Error) message = error.message;

        return NextResponse.json(
            { success: false, message },
            { status: 500 }
        );
    }
}
