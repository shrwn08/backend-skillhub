import express from "express";
import userModel from "../models/user.model.js"
import { protect, authorise } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.get('/:id',   protect, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


export default router;