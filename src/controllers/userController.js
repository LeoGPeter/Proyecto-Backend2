import UserDTO from "../dto/UserDTO.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = req.user; 
        if (!user) {
            return res.status(401).json({ message: "No autorizado" });
        }

        const userDTO = new UserDTO(user); 
        res.json(userDTO); 
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

