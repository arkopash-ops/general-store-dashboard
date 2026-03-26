import { model, models, Schema } from "mongoose";
import { CategoriesDocument } from "../types/categories.types";

const CategorySchema = new Schema<CategoriesDocument>({
    category_type: {
        type: String,
        required: true,
        unique: true
    },

    description: { type: String },
}, { timestamps: true });

const categoriesModel = models.Category ||
    model<CategoriesDocument>("Category", CategorySchema);

export default categoriesModel;
