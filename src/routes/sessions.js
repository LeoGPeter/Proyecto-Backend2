import express from 'express';
import passport from 'passport';
import UserDTO from "../dto/UserDTO.js";
import { loginController } from '../controllers/sessionsController.js';
import {checkAuth} from '../middlewares/authMiddleware.js'


const router = express.Router();

router.post('/login', loginController);


router.get("/current", checkAuth, (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json(userDTO);
});



export default router;
