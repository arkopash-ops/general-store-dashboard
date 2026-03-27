import { connectToDB } from "@/lib/db";
import productModel from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";

// CREATE PRODUCT
export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const body = await req.json();

        const {
            product_name,
            category_id,
            unit_price,
            stock_quantity,
            supplier_id,
            description
        } = body;

        if (!product_name) {
            return NextResponse.json(
                { success: false, message: "category_type is required" },
                { status: 400 }
            );
        }

        const existing = await productModel.findOne({ product_name });

        if (existing) {
            return NextResponse.json(
                { success: false, message: "Product already exists" },
                { status: 400 }
            );
        }

        const product = await productModel.create({
            product_name,
            category_id,
            unit_price,
            stock_quantity,
            supplier_id,
            description
        });

        return NextResponse.json({
            success: true,
            data: product,
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


// GET ALL PRODUCTS
export async function GET() {
    try {
        await connectToDB();

        const products = await productModel.find().sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: products,
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
