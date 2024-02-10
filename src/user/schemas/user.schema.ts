import * as mongoose from "mongoose";
import * as validator from "validator";
import * as bcrypt from "bcrypt";

export const UserSchema = new mongoose.Schema ({
  fullName: {
    type: String,
    minlength: 6,
    maxlength: 255,
    required: [true, 'NAME_IS_BLANK'],
  },
  email: {
    type: String,
    lowercase: true,
    validate: validator.isEmail,
    maxlength: 255,
    minlength: 6,
    required: [true, 'EMAIL_IS_BLANK'],
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: [true, 'PASSWORD_IS_BLANK'],
  },
}, {
  versionKey: false,
  timestamps: true,
});

UserSchema.pre('save', async function(next: (err?: Error) => void) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    this['password'] = await bcrypt.hash(this['password'], 10);
    return next();
  } catch (err) {
    return next(err);
  }
});