import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import { ICourseCategory } from "./category.interface";
import { CourseCetegory } from "./category.model";


const createCourseCategory = async (payload: ICourseCategory) => {
    const { name } = payload;

    if (!payload.name || !payload.description || !payload.thumbnail) {
        throw new AppError(400, "name, description & thumbnail are required");
    }

    const existingCategory = await CourseCetegory.findOne({ name });

    if (existingCategory) {
        throw new AppError(400, `${name} category already exists`);
    };


    const newCategory = await CourseCetegory.create(payload);

    return newCategory

};


const getAllCourseCategories = async () => {
    const categories = await CourseCetegory.find().sort({ createdAt: -1 });
    return categories;
};


const updateCourseCategory = async (id: string, payload: Partial<ICourseCategory>) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(400, "Invalid category ID");
    };

    const existingCategory = await CourseCetegory.findById(id);

    if (!existingCategory) {
        throw new AppError(404, "Category not found");
    };

    if (payload.name) {
        const duplicate = await CourseCetegory.findOne({
            name: payload.name,
            _id: { $ne: id },
        });

        if (duplicate) {
            throw new AppError(400, `${payload.name} already exists`);
        }
    };

    const updatedCategory = await CourseCetegory.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return updatedCategory

};


export const categoryServices = {
    createCourseCategory,
    getAllCourseCategories,
    updateCourseCategory
}