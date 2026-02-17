import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const UserSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  avatar: { 
    type: String, 
    default: '' 
  }
}, { timestamps: true });

// Password Hashing Middleware (Security Best Practice)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return ;
  this.password = await hash(this.password, 10);
  // next();
});

// Method to check password validity during login
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

export default model('User', UserSchema);