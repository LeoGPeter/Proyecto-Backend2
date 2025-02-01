import userService from '../services/user.service.js';
import { generateToken } from '../utils.js';

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña requeridos" });
    }

    try {
        const user = await userService.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        // Aquí deberías verificar la contraseña con bcrypt.compare()
        
        const token = generateToken(user);
        res.cookie("currentUser", token, { httpOnly: true });

        
        res.status(200).json({ message: "Login exitoso", token });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



