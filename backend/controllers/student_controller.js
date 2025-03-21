const Student = require("../models/student_model");

// Add a new student
const addStudent = async (req, res) => {
    try {
        const { studentId, name, age, image, status } = req.body;

        // Check if studentId already exists
        const existingStudent = await Student.findOne({ studentId });
        if (existingStudent) {
            return res.status(400).json({ message: "Student ID already exists" });
        }

        const newStudent = new Student({ studentId, name, age, image, status });
        await newStudent.save();

        res.status(201).json({ message: "Student added successfully", newStudent });
    } catch (error) {
        res.status(500).json({ message: "Error adding student", error });

    }
};

// Get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving students", error });
    }
};

// Get a student by studentId
const getStudentById = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findOne({ studentId });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving student", error });
    }
};



// Update student details by studentId
const updateStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const updates = req.body;

        const student = await Student.findOneAndUpdate({ studentId }, updates, { new: true });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student updated successfully", student });
    } catch (error) {
        res.status(500).json({ message: "Error updating student", error });
    }
};

// Delete student by studentId
const deleteStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const deletedStudent = await Student.findOneAndDelete({ studentId });

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student", error });
    }
};

module.exports = { addStudent, getStudents, updateStudent, deleteStudent, getStudentById };
