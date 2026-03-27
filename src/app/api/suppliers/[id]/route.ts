import { connectToDB } from "@/lib/db";
import supplierModel from "@/models/suppliers.models";
import { ISupplier } from "@/types/suppliers.types";
import { NextRequest, NextResponse } from "next/server";

// GET SUPPLIER BY ID
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDB();
        const { id } = await context.params;
        const supplier = await supplierModel.findById(id);
        if (!supplier) {
            return NextResponse.json(
                { success: false, message: "Supplier not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            success: true,
            data: supplier
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


// EDIT SUPPLIER
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDB();

        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Supplier ID is required" },
                { status: 400 }
            );
        }

        const body: Partial<ISupplier> = await req.json();
        const { supplier_name, contact_number, email, supplier_company } = body;

        // Duplicate check for company name
        if (supplier_company?.name) {
            const existing = await supplierModel.findOne({
                "supplier_company.name": supplier_company.name,
                _id: { $ne: id },
            });
            if (existing) {
                return NextResponse.json(
                    { success: false, message: "Supplier already exists" },
                    { status: 400 }
                );
            }
        }

        // Build update object
        const updateData: Record<string, unknown> = {};

        if (supplier_name !== undefined) updateData.supplier_name = supplier_name;
        if (contact_number !== undefined) updateData.contact_number = contact_number;
        if (email !== undefined) updateData.email = email;

        if (supplier_company) {
            if (supplier_company.name) updateData["supplier_company.name"] = supplier_company.name;

            if (supplier_company.address) {
                updateData["supplier_company.address.street"] = supplier_company.address.street;
                updateData["supplier_company.address.city"] = supplier_company.address.city;
                updateData["supplier_company.address.state"] = supplier_company.address.state;
                updateData["supplier_company.address.zipCode"] = supplier_company.address.zipCode;
                updateData["supplier_company.address.country"] = supplier_company.address.country;
            }

            if (supplier_company.contact) {
                updateData["supplier_company.contact.phone"] = supplier_company.contact.phone;
                updateData["supplier_company.contact.email"] = supplier_company.contact.email;
            }

            if (supplier_company.socialMedia) {
                updateData["supplier_company.socialMedia.instagram"] = supplier_company.socialMedia.instagram;
                updateData["supplier_company.socialMedia.facebook"] = supplier_company.socialMedia.facebook;
                updateData["supplier_company.socialMedia.twitter"] = supplier_company.socialMedia.twitter;
                updateData["supplier_company.socialMedia.linkedin"] = supplier_company.socialMedia.linkedin;
            }
        }

        const supplier = await supplierModel.findOneAndUpdate(
            { _id: id },
            { $set: updateData },
            { returnDocument: "after" }
        );

        if (!supplier) {
            return NextResponse.json(
                { success: false, message: "Supplier not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: supplier
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


// DELETE SUPPLIER
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDB();

        const { id } = await context.params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Supplier ID is required" },
                { status: 400 }
            );
        }

        const deletedSupplier = await supplierModel.findOneAndDelete({ _id: id });

        if (!deletedSupplier) {
            return NextResponse.json(
                { success: false, message: "Supplier not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Supplier deleted",
            data: deletedSupplier,
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
