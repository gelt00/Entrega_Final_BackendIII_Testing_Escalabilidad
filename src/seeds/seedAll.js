import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { seedUsers } from "./users.seed.js";
import { seedProducts } from "./products.seed.js";
import { seedPets } from "./pets.seed.js";
import { logger } from "../utils/logger.js";

export async function runAllSeeds() {
  try {
    logger.info({
      msg: "Iniciando proceso de carga Inicial en la Base de Datos...",
    });
    await connectDB();

    await seedUsers();
    await seedProducts();
    await seedPets();

    logger.info({ msg: "Carga Inicial Completada con éxito" });
  } catch (error) {
    logger.error({
      msg: "Error durante el proceso de carga Inicial",
      error: error.message,
    });
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

// Ejecutar si se invoca directamente desde línea de comandos
runAllSeeds();
