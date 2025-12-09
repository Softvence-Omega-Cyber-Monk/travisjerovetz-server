export interface ICourse {
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    prices: number;
    courseTag: string;
    whatsUserLearn: string[];
    instructorName: string;
    instructorTitle: string;
    instructorDescription: string;
    instructorProfile: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum ICouesrCategoryEnum {
    Management = "Management",
    Technology = "Technology",
    CustomerService = "Customer Service",
    Productivity = "Productivity",
    Other = "Other"
}
