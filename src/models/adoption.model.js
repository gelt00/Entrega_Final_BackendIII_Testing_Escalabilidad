import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const AdoptionModel = mongoose.model('Adoption', adoptionSchema);
