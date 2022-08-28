export interface IProduct {
    id?: number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    image: string;
    comment?: string;
}