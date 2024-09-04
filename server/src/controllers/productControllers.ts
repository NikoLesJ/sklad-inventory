import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const products = await prisma.products.findMany({
            where: {
                name: {
                    contains: search,
                },
            },
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products" })
    }
}

export const createProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { productId, name, price, rating, stockQuantity } = req.body;
        const product = await prisma.products.create({
            data: {
                productId,
                name,
                price,
                rating,
                stockQuantity,
            },
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creating product" })
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;

        // Удаляем все продажи, связанные с продуктом
        await prisma.sales.deleteMany({
            where: { productId },
        });

        // Удаляем все покупки, связанные с продуктом
        await prisma.purchases.deleteMany({
            where: { productId },
        });

        // Удаляем сам продукт
        await prisma.products.delete({
            where: { productId },
        });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product", error });
    }
}


export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;
        const { name,  price, stockQuantity, rating } = req.body;

        const updatedProduct = await prisma.products.update({
            where: { productId },
            data: {
                name,
                price,
                stockQuantity,
                rating,
            },
        });

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product" });
    }
}