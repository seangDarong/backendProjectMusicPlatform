require('dotenv').config();
const userModel = require('../models/Subscriber.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
    //a funtion for user to register
    static async register (req,res) {
        const {username, email, password, name, dob, country} = req.body;
        //check for all field to be input to prevent emtpty
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
    //login function
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

    // function for user to view their own profile
    static async getProfile(req,res) {
        try{
            // req.user.id come from the JWT middleware
            const user = await userModel.findByPk(req.user.id,{
                attributes: {exclude:['passwordHash']}
            });
            if (!user) return res.status(404).json({ message :"User not found"});
            res.json(user);
        }catch(error){
            res.status(500).json({error : error.message});
        }
    }

    //function for user to update their own information 
    static async updateProfile(req,res){
        try{
            const {name, dob, country} = req.body;
            const user = await userModel.findByPk(req.user.id);
            if (!user){
                res.status(404).json({message : "user not found"});
            }
            //only update fields if provided
            if (name) user.name = name;
            if (dob) user.dob = dob;
            if (country) user.country = country;

            await user.save();
            res.json({message : "Profile updated"});
            }catch(error){
                res.status(500).json({error:error.message});
            }
    }
    
}

module.exports = UserController;
