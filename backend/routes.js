import express from "express";
import path from "path";
import { loginUser, registerUser } from './controllers/authController.js';
import { getModel } from './controllers/modelController.js'

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/model', getModel)
router.get("*", (req, res) => {
    const indexPath = path.join(process.cwd(), "dist", "index.html");
    res.sendFile(indexPath);
});


export default router;
