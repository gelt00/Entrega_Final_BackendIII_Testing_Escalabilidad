import mongoose from 'mongoose';
import { PetModel } from '../models/pet.model.js';

export async function getPetById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return PetModel.findById(id).lean();
}

export async function createPet(data) {
  return PetModel.create(data);
}

export async function updatePetById(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return PetModel.findByIdAndUpdate(id, data, { new: true }).lean();
}
