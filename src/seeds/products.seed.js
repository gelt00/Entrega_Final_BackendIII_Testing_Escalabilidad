import { ProductModel } from "../models/product.model.js";
import { logger } from "../utils/logger.js";

const initialProducts = [
  {
    title: "Mouse gamer",
    price: 100,
    stock: 10,
  },
  {
    title: "Teclado mecánico",
    price: 150,
    stock: 20,
  },
  {
    title: "Monitor 24 pulgadas",
    price: 300,
    stock: 5,
  },
];

export async function seedProducts() {
  const productsCount = await ProductModel.estimatedDocumentCount();

  if (productsCount > 0) {
    logger.info({
      msg: "Carga Inicial Omitida",
      reason: "Los productos ya existen",
    });

    return;
  }

  const products = await ProductModel.insertMany(initialProducts);

  logger.info({
    msg: "Carga Inicial Completa",
    products: products.map((product) => ({
      id: product._id,
      title: product.title,
      price: product.price,
      stock: product.stock,
    })),
  });
}
