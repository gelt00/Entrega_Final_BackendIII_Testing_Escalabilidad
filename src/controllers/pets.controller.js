import { PetModel } from '../models/pet.model.js';
import { createError } from '../utils/createError.js';
import { successResponse } from '../utils/apiResponse.js';

export async function getPets(req, res, next) {
  try {
    const pets = await PetModel.find().lean();
    return successResponse(res, {
      message: 'Mascotas obtenidas exitosamente',
      payload: pets,
    });
  } catch (error) {
    next(error);
  }
}

export async function createPet(req, res, next) {
  try {
    const { name, specie, birthDate } = req.body;

    if (!name || !specie) {
      return next(createError('El nombre y la especie son requeridos', 400));
    }

    const pet = await PetModel.create({
      name,
      specie,
      birthDate,
      adopted: false,
    });

    return successResponse(res, {
      statusCode: 201,
      message: 'Mascota registrada exitosamente',
      payload: pet,
    });
  } catch (error) {
    next(error);
  }
}
