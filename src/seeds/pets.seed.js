import { PetModel } from "../models/pet.model.js";
import { logger } from "../utils/logger.js";

const initialPets = [
  {
    name: "Firulais",
    specie: "perro",
    birthDate: new Date("2026-05-10"),
    adopted: false,
  },
  {
    name: "Michi",
    specie: "gato",
    birthDate: new Date("2026-01-15"),
    adopted: false,
  },
  {
    name: "Rocky",
    specie: "perro",
    birthDate: new Date("2026-11-20"),
    adopted: false,
  },
];

export async function seedPets() {
  const petsCount = await PetModel.estimatedDocumentCount();

  if (petsCount > 0) {
    logger.info({
      msg: "Carga Inicial Omitida",
      reason: "Las mascota ya existe",
    });
    return;
  }

  const pets = await PetModel.insertMany(initialPets);

  logger.info({
    msg: "Carga Inicial Completa",
    pets: pets.map((pet) => ({
      id: pet._id,
      name: pet.name,
      specie: pet.specie,
      birthDate: pet.birthDate,
      adopted: pet.adopted,
    })),
  });
}
