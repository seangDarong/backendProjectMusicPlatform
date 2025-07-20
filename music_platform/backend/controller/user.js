require('dotenv').config();
const userModel = require('../models/Subscriber.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
    static async register (req,res) {
        const {username, email, password, name, dob, country} = req.body;

        if (!username || !email || !password || !name || !dob || !country) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            const existingUser = await userModel.findOne({ where: { email } });
            if (existingUser){
                return res.status(400).json({message : "Error: email already exists."})
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = await userModel.create({
                username,
                email,
                name,
                dob,
                country,
                passwordHash: hashedPassword
            });
            res.status(201).json({ message: "User registered successfully." });
        }catch(error){
            res.status(500).json({ message : "Server error" });
        }
    }

    static async login(req,res){
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message : "Email and password are required"});
        }

        try{
            const user = await userModel.findOne({where :{email}});
            if (!user){
                return res.status(400).json({message : "Invalid email."});
            }
            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch){
                return res.status(400).json({message : "Invalid password"});
            }

            const token = jwt.sign({ id: user.subscriber_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({message : "Login successful.",token});
        }catch(error){
            res.status(500).json({message: "server error"});
        }
    }
}

module.exports = UserController;
