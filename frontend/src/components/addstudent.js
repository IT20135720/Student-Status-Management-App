import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newStudent = {
            studentId,
            name,
            age,
            status: 'Active', // Status is always set to "Active"
            image
        };

        try {
             await axios.post('http://localhost:5000/api/students/add', newStudent, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            setSuccessMessage('Student added successfully!');
            setErrorMessage('');
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 2000);
        } catch (error) {
            setErrorMessage('Error adding student. Please try again.');
            setSuccessMessage('');
            console.error('Error adding student:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="mt-5">Add New Student</h2>
            <form onSubmit={handleSubmit} className="my-4">
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                <div className="mb-3">
                    <label htmlFor="studentId" className="form-label">Student ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="studentId"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>

                {/* Status Field (Hidden) */}
                <input type="hidden" name="status" value="Active" />

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Enter image URL"
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudent;
