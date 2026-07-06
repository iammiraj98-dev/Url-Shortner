import mongoose from 'mongoose';
const urlShortnerSchema = new mongoose.Schema(
  {
    shortKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('url_shortner',urlShortnerSchema);