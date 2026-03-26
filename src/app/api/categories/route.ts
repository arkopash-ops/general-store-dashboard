import { connectToDB } from "@/lib/db";
import categoriesModel from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";

// CREATE CATEGORIES
export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const body = await req.json();

        const { category_type, description } = body;

        if (!category_type) {
            return NextResponse.json(
                { success: false, message: "category_type is required" },
                { status: 400 }
            );
        }

        const existing = await categoriesModel.findOne({ category_type });

        if (existing) {
            return NextResponse.json(
                { success: false, message: "Category already exists" },
                { status: 400 }
            );
        }

        const category = await categoriesModel.create({
            category_type,
            description,
        });

        return NextResponse.json({
            success: true,
            data: category,
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


// GET ALL CATEGORIES
export async function GET() {
    try {
        await connectToDB();

        const categories = await categoriesModel.find().sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: categories,
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
