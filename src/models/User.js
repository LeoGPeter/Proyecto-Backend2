import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    role: { type: String, default: 'user' },
});

// Encriptar la contraseña usando bcrypt antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Solo encriptar si la contraseña ha cambiado

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

// Comparar contraseña proporcionada con la almacenada
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

