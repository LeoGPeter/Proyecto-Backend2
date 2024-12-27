import express from 'express';
import passport from 'passport';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword, generateToken } from '../utils.js';

const router = express.Router();

// Crear usuario (con hash de contraseña)
router.post('/', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const newUser = new User({ first_name, last_name, email, age, password });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email y contraseña son requeridos.');
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Usuario no encontrado.');
        }

        const isPasswordValid = await user.comparePassword(password); // Compara usando el método del modelo
        if (!isPasswordValid) {
            return res.status(401).send('Contraseña incorrecta.');
        }

        // Generar token JWT
        const token = jwt.sign(  // Aquí es donde se usa jwt
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Guardar el token en una cookie
        res.cookie('currentUser', token, { httpOnly: true, signed: true, maxAge: 3600000 });

        res.redirect('/users/current');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // No enviar contraseñas
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, age, role } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { first_name, last_name, age, role }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
