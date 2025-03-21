const mongoose =  require("mongoose");

const StudentSchema = new mongoose.Schema({
    studentId:
    {
        type: String,
        required: true,
        unique:true,
    },

    name:
    {
        type: String,
        required: true,
    },

    image:
    {
        type: String,
        required: false,
    },

    age:
    {
        type: Number,
        required: true,

    },

    status:
    {
        type: String ,
        enum: ["Active" , "InActive"],
        default: "Active",

    }
})

module.exports = mongoose.model("Student",StudentSchema);
