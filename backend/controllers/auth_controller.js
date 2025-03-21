const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin_model");

const register = async (req, res) => {
    try {
        const { firstname, lastname, email, username, password } = req.body;

        // Check if the email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const admin = new Admin({ firstname, lastname, email, username, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: "Admin registered successfully!" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Server error, please try again." });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin by username
        const admin = await Admin.findOne({ username });
        if (!admin || !admin.password || !(await bcrypt.compare(password, admin.password))) {
            return res.status(400).json({ error: "Invalid username or password. Please try again." });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, admin });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error, please try again." });
    }
};

module.exports = { register, login };
