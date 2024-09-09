import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  avatar: { type: Buffer },
  avatarContentType: {type: String},
  isTwoFAEnabled: { type: Boolean, default: false },
  twoFASecret: { type: String },
  qrCodeGeneratedIp: { type: String },
  qrCodeScannedIp: { type: String },
  newQrCodeScannedIp: { type: String },
  twoFAMethod: { type: String, enum: ['email', 'phone', 'qr', 'none'], default: 'none' },
  token: { type: String },
  lastLogin: { type: Date },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

export { User };
