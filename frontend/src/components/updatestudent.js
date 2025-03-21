import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: '',
        age: '',
        status: 'Inactive', // Default to Inactive
        image: ''
    });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/students/${studentId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setStudent(res.data);
            } catch (error) {
                console.error("Error fetching student details:", error);
            }
        };

        fetchStudent();
    }, [studentId]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/students/update/${studentId}`, student, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert("Student updated successfully!");
            navigate('/admin/dashboard');
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        name="age"
                        value={student.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Status Field with Dropdown inside Input */}
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={student.status}
                        onChange={handleChange}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        name="image"
                        value={student.image}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update Student</button>
            </form>
        </div>
    );
};

export default EditStudent;
