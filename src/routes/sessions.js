import express from 'express';
import passport from 'passport';

const router = express.Router();

// Ruta para obtener datos del usuario actual usando JWT
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Si Passport autenticó correctamente, 'req.user' tiene los datos del usuario
    const { first_name, last_name, email, age, role } = req.user;

    // Renderizar la vista de "current" con los datos del usuario
    res.render('current', {
        first_name,
        last_name,
        email,
        age,
        role
    });
});

export default router;
