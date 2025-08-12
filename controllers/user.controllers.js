const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const fs=require('fs')
const path=require('path')
const signup = async (req, res) => {
  try {
    let { name, password, confirmPassword, email ,photo} = req.body;

    if (password !== confirmPassword) {
if(req.file)
{  fs.unlinkSync(path.join(__dirname,'../uploads',req.file.filename))
}




      return res
        .status(400)
        .json({ status: "fail", message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {

if(req.file)
{  fs.unlinkSync(path.join(__dirname,'../uploads',req.file.filename))
}


      return res
        .status(400)
        .json({ status: "fail", message: "User already exists" });
    }

photo=req.file?.filename||'profile.webp'
    const user = await User.create({ name, password:password, email ,photo});

    const token = JWT.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn:process.env. JWT_EXPIRES_IN}
    );

    res.status(201).json({
      status: "success",
      token,
      data: { user: { id: user._id, name: user.name, email: user.email ,photo:user.photo} },
    });
  } catch (err) {

    if(req.file)
{  fs.unlinkSync(path.join(__dirname,'../uploads',req.file.filename))
}

    res.status(400).json({
      status: "fail",
      message: `Signup error: ${err.message}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Please provide email and password" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedPassword) {
      return res
        .status(401)
        .json({ status: "fail", message: "Incorrect password" });
    }

    const token = JWT.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn:process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      status: "success",
      token,
      data: { user: { id: existingUser._id, name: existingUser.name } },
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

const protectRoutes = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    } else {
      return res.status(400).json({ status: "fail", message: "login failed" });
    }

    const decodedToken = JWT.verify(
      token,
      "19e00657919c1021dfd3abf4cf2d04b0137d9d51bae5cf7a7c47b2a373c1d55b"
    );
    console.log("decoded token", decodedToken);
    next();
  } catch (err) {
    return res.status(401).json({ status: "fail", message: err.message });
  }
};

const addMovieToFav=async (req,res)=>{
try{const userId=res.userId;

const {movieId}=req.body;

const user=User.findById(userId);

if(!user){
  return res.status(404).json({status:'fail',message:"USER NOT FOUND"})

}
let alreadyAdded =user.favMovies?.includes(movieId);
if(alreadyAdded){
  return res.status(400).json({status:"fail",message:"Movie already exists"})
}
user.favMovies.push(movieId);
await user.save();
res.status(200).json({status:'success',message:'movie is added successfully'})
}catch(err){
  res.status(500).json({status:'fail',message:err.message})
}




}

module.exports = { signup, login, protectRoutes,addMovieToFav };
