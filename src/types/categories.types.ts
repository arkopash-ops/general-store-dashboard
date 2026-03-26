import { Document } from "mongoose";

export interface ICategories {
    category_type: string;
    description?: string;
}

export interface CategoriesDocument extends ICategories, Document { }
