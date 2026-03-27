import { SuppliersDocument } from "@/types/suppliers.types";
import mongoose, { Schema, model, Model } from "mongoose";

// Address 
const AddressSchema = new Schema({
    street: { type: String, required: true },

    city: { type: String, required: true },

    state: { type: String, required: true },

    zipCode: { type: String, required: true },

    country: { type: String, required: true },
}, { _id: false });


// Contact 
const ContactSchema = new Schema({
    phone: { type: String, required: true },

    email: { type: String }
}, { _id: false });


// Social Media 
const SocialMediaSchema = new Schema({
    instagram: { type: String },

    facebook: { type: String },

    twitter: { type: String },

    linkedin: { type: String }
}, { _id: false });


// Company 
const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    address: { type: AddressSchema },

    contact: { type: ContactSchema },

    socialMedia: { type: SocialMediaSchema }
}, { _id: false });


// Supplier 
const SupplierSchema = new Schema<SuppliersDocument>({
    supplier_name: { type: String, required: true },
    
    contact_number: { type: String, required: true },
    
    email: { type: String },

    supplier_company: { type: CompanySchema, required: true }
}, { timestamps: true });

const supplierModel: Model<SuppliersDocument> =
    mongoose.models.Supplier || model<SuppliersDocument>("Supplier", SupplierSchema);

export default supplierModel;
