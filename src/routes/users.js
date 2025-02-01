import express from 'express';
import passport from 'passport';
import User from '../dao/models/user.model.js';
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
