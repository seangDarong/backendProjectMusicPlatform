require('dotenv').config();
const userModel = require('../models/Subscriber.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
    // REGISTER FUNCTION
    static async register(req, res) {
        const { username, email, password, name, dob, country } = req.body;

        if (!username || !email || !password || !name || !dob || !country) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            const existingUser = await userModel.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "Error: email already exists." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({
                username,
                email,
                name,
                dob,
                country,
                passwordHash: hashedPassword,
                planType: 'free' // 👈 default plan
            });

            res.status(201).json({ message: "User registered successfully." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }

    //  LOGIN FUNCTION
    static async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        try {
            const user = await userModel.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: "Invalid email." });
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid password" });
            }

            const token = jwt.sign({ id: user.subscriber_id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({
                message: "Login successful.",
                token,
                userId: user.subscriber_id
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }

    //  GET USER PROFILE FUNCTION
    static async getProfile(req, res) {
        try {
            const user = await userModel.findByPk(req.user.id, {
                attributes: { exclude: ['passwordHash'] }
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const userData = user.toJSON();

            // 🧠 If premium, calculate remaining days
            if (user.planType === 'premium' && user.subscriptionEnd) {
                const now = new Date();
                const end = new Date(user.subscriptionEnd);
                const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

                userData.daysLeft = daysLeft >= 0 ? daysLeft : 0;
            }

            res.json(userData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    //  UPDATE USER PROFILE FUNCTION
    static async updateProfile(req, res) {
        try {
            const { name, dob, country, username } = req.body;
            const user = await userModel.findByPk(req.user.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (name) user.name = name;
            if (dob) user.dob = dob;
            if (country) user.country = country;
            if (username) user.username = username;

            await user.save();
            res.json({ message: "Profile updated" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
