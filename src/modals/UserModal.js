import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true },
        coordinate: { type: String, required: true },
    },
    { timestamps: true }
);

const User = new mongoose.model('User', userSchema);
export default User;
