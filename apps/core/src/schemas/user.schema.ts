import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  user_name: { type: String, required: true },
  dob: { type: Date },
  address: { type: String },
  country: { type: String },
  phone_number: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verification_token: { type: String, default: new mongoose.Types.ObjectId() },
  ip: { type: String },
  role: { type: String, default: 'user' },
  auth_method: { type: String, default: 'email' },
  receive_promotions: { type: Boolean, default: false },
  receive_email: { type: Boolean, default: false },
  receive_sms: { type: Boolean, default: false },
  receive_phone: { type: Boolean, default: false },
});

/**
 * Hash the password before saving the user
 */
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
