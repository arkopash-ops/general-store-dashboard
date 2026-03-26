import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import categoriesModel from "@/models/categories.model";

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDB();

        const { id } = await context.params;
        console.log(id);

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Category ID is required" },
                { status: 400 }
            );
        }

        const body = await req.json();
        const { category_type, description } = body;

        // Prevent duplicates
        if (category_type) {
            const existing = await categoriesModel.findOne({
                category_type,
                _id: { $ne: id },
            });
            if (existing) {
                return NextResponse.json(
                    { success: false, message: "Category type already exists" },
                    { status: 400 }
                );
            }
        }

        const updateData: Partial<{ category_type: string; description: string }> =
            {};
        if (category_type !== undefined) updateData.category_type = category_type;
        if (description !== undefined) updateData.description = description;

        const category = await categoriesModel.findOneAndUpdate(
            { _id: id },
            { $set: updateData },
            { returnDocument: "after" }
        );

        if (!category) {
            return NextResponse.json(
                { success: false, message: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: category });
    } catch (error: unknown) {
        let message = "Internal server error";
        if (error instanceof Error) message = error.message;

        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}



// DELETE CATEGORIES
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

        const deletedCategory = await categoriesModel.findOneAndDelete({ _id: id });

        if (!deletedCategory) {
            return NextResponse.json(
                { success: false, message: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Category deleted",
            data: deletedCategory,
        });
    } catch (error: unknown) {
        let message = "Internal server error";
        if (error instanceof Error) message = error.message;

        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}
