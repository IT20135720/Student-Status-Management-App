const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const dotenv = require("dotenv");
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'/auth/google/callback', 
    scope: ["profile","email"]
}, async (accessToken, refreshToken, profile, done) => {
       done(null,profile)
        
    } 

));
    // Serialize user to store in session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
    done(null, user);
});