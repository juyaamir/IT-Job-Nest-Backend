import mongoose from 'mongoose';

//model for user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
