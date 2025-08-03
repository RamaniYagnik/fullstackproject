import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSignupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String},
    password: { type: String, required: true }
}, { timestamps: true })

userSignupSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

export default mongoose.model('signupusers',userSignupSchema)