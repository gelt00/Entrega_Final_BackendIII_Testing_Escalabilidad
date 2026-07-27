import mongoose from 'mongoose';
import { AdoptionModel } from '../models/adoption.model.js';

export async function getAllAdoptions() {
  return AdoptionModel.find().lean();
}

export async function getAdoptionById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return AdoptionModel.findById(id).lean();
}

export async function createAdoption(data) {
  const adoption = await AdoptionModel.create(data);
  return {
    _id: adoption._id,
    owner: adoption.owner,
    pet: adoption.pet,
    status: adoption.status,
    createdAt: adoption.createdAt,
    updatedAt: adoption.updatedAt,
  };
}
