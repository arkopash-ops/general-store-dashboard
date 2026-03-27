import { connectToDB } from "@/lib/db";
import supplierModel from "@/models/suppliers.models";
import { NextRequest, NextResponse } from "next/server";

// CREATE SUPPLIERS
export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const body = await req.json();

        const {
            supplier_name,
            contact_number,
            email,
            supplier_company
        } = body;

        // Basic validation
        if (!supplier_name || !contact_number || !supplier_company?.name) {
            return NextResponse.json(
                {
                    success: false,
                    message: "supplier_name, contact_number and supplier_company.name are required",
                },
                { status: 400 }
            );
        }

        const existing = await supplierModel.findOne({
            $or: [
                { contact_number },
                { "supplier_company.name": supplier_company.name }
            ]
        });

        if (existing) {
            return NextResponse.json(
                { success: false, message: "Supplier already exists" },
                { status: 400 }
            );
        }

        // Create supplier
        const supplier = await supplierModel.create({
            supplier_name,
            contact_number,
            email,
            supplier_company: {
                name: supplier_company.name,
                address: supplier_company.address,
                contact: supplier_company.contact,
                socialMedia: supplier_company.socialMedia
            }
        });

        return NextResponse.json({
            success: true,
            data: supplier,
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


// GET ALL SUPPLIERS
export async function GET() {
    try {
        await connectToDB();

        const suppliers = await supplierModel.find().sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: suppliers,
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
