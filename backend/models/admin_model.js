const mongoose = require("mongoose");

const AdminSchema  =  new mongoose.Schema({
    googleId:
     { 
         type: String, 
         unique: true,
         sparse: true,
     },

    firstname:
    {
        type: String,
        required: true,
      
    },

    lastname :
    {
        type: String,
        required: true,
    },

    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    
    username :
    {
        type: String,
        required: true,
       
    },

    password : 
    {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Admin",AdminSchema);