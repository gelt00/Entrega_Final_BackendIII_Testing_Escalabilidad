import mongoose from 'mongoose';
import { UserModel } from '../models/user.model.js';

export async function findUserByEmail(email) {
  return UserModel.findOne({ email }).lean();
}

export async function getUserById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return UserModel.findById(id).lean();
}