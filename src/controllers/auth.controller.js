import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

//sign and return a jwt

const signToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  //remove passward from putput

  user.password = undefined;
  res.status(statusCode).json({ sucess: true, token, data: user });
};

//register controller

export const register = async (req, res) => {
  try {
    const { name, email, password, role, skills, interests } = req.body;

    const allowedRole = ["user", "mentor"].includes(role) ? role : "user";

    const existing = await userModel.findOne({ email });

    if (existing)
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });

    const user = await userModel.create({
      name,
      email,
      password,
      role: allowedRole,
      skills: skills || [],
      interests: interests || [],
    });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//login

export const login = async (req, res) =>{
    try {
      const {email, password} = req.body;

      if(!email || !password){
        return res.status(400).json({success : false, message : "Email and password required"});
      }

      const user = await userModel.findOne({email}).select('+password');

      if(!user || !(await user.matchPassword(password))){
        return res.status(401).json({success : false, message : 'Invaild email or password'});
      }


      if(!user.isActive){
        return res.status(403).json({success : false, message : 'Accont is deactivated'});
      }

      sendToken(user, 200, res)
    } catch (error) {
      res.status(500).json({success : false, message : error.message});
    }
}


//me (protected)

exports.getMe = async (req, res) =>{
  try {
    const user = await userModel(req.user._id);
    res.json({success : true, data : user});
  } catch (error) {
    res.status(500).json({success : false, message : error.message});
  }
}

//profile upload

exports.updateProfile = async (req, res) => {
  try {
    const allowed = ['name', 'bio', 'location', 'phone', 'skills', 'interests'];
    const updates = {};
    allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });
 
    const user = await userModel.findByIdAndUpdate(req.user._id, updates, {
      new: true, runValidators: true,
    });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 

//change-password

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
 
    const user = await userModel.findById(req.user._id).select('+password');
    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }
 
    user.password = newPassword;
    await user.save();
 
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};