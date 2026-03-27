import { Document } from "mongoose";

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface Contact {
    phone: string;
    email?: string;
}

export interface SocialMedia {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
}

export interface Company {
    name: string;
    address?: Address;
    contact?: Contact;
    socialMedia?: SocialMedia;
}

export interface ISupplier {
    supplier_name: string;
    contact_number: string;
    email?: string;
    supplier_company: Company;
}

export interface SuppliersDocument extends ISupplier, Document { }
