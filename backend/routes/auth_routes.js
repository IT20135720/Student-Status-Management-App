const express = require("express");
const { register, login } = require("../controllers/auth_controller");
const passport = require("passport");
const Admin = require("../models/googlelogin_model");
const generateToken = require("../utils/jwt");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Redirect to Google Authentication
router.get('/google', passport.authenticate("google", { scope: ["profile", "email"] }));

// Handle Google Authentication Callback
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
    successRedirect: process.env.CLIENT_URL
}));

// register to Database
router.get("/login/success", async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: "Not Authorized" });
    }

    const userExists = await Admin.findOne({ email: req.user._json.email });

    if (userExists) {
        generateToken(res, userExists._id);
        return res.status(200).json({
            user: { ...req.user, isAdmin: userExists.isAdmin },
            message: "Successfully logged in",
            _id: userExists._id
        });
    }

    const newUser = new Admin({
        name: req.user._json.name,
        email: req.user._json.email,
        password: Date.now()
    });

    await newUser.save();
    generateToken(res, newUser._id);

    res.status(200).json({
        user: { ...req.user, isAdmin: false },
        message: "Successfully registered and logged in",
        _id: newUser._id
    });
});

// Handle Login Failure
router.get("/login/failed", (req, res) => {
    res.status(401).json({ error: "Login Failed" });
});

// Logout
router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect(process.env.CLIENT_URL);
    });
});



module.exports = router;
