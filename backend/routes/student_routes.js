const express = require("express");
const {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    getStudentById,
} = require("../controllers/student_controller");

const router = express.Router();

// Route to add a new student
router.post("/add", addStudent);

// Route to get all students
router.get("/", getStudents);

// Route to get a student by id
router.get('/:studentId', getStudentById);

// Route to update student details by studentId
router.put("/update/:studentId", updateStudent);

// Route to delete a student by studentId
router.delete("/delete/:studentId", deleteStudent);

module.exports = router;

