import {
  getAllAdoptions as fetchAllAdoptions,
  getAdoptionById as fetchAdoptionById,
  createAdoption as saveAdoption
} from '../repositories/adoptions.repository.js';
import { getUserById } from '../repositories/users.repository.js';
import { getPetById, updatePetById } from '../repositories/pets.repository.js';
import { createError } from '../utils/createError.js';
import { successResponse } from '../utils/apiResponse.js';

export async function getAllAdoptions(req, res, next) {
  try {
    const adoptions = await fetchAllAdoptions();
    return successResponse(res, {
      message: 'Adopciones obtenidas exitosamente',
      payload: adoptions,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAdoptionById(req, res, next) {
  try {
    const { aid } = req.params;
    const adoption = await fetchAdoptionById(aid);

    if (!adoption) {
      return next(createError('Adopción no encontrada', 404));
    }

    return successResponse(res, {
      message: 'Adopción encontrada',
      payload: adoption,
    });
  } catch (error) {
    next(error);
  }
}

export async function createAdoption(req, res, next) {
  try {
    const { uid, pid } = req.params;

    if (!uid || !pid) {
      return next(createError('ID de usuario e ID de mascota requeridos', 400));
    }

    const user = await getUserById(uid);
    if (!user) {
      return next(createError('Usuario no encontrado', 404));
    }

    const pet = await getPetById(pid);
    if (!pet) {
      return next(createError('Mascota no encontrada', 404));
    }

    if (pet.adopted) {
      return next(createError('La mascota ya ha sido adoptada', 400));
    }

    const adoption = await saveAdoption({
      owner: uid,
      pet: pid,
      status: 'completado',
    });

    await updatePetById(pid, { adopted: true, owner: uid });

    return successResponse(res, {
      statusCode: 201,
      message: 'Adopción creada exitosamente',
      payload: adoption,
    });
  } catch (error) {
    next(error);
  }
}
