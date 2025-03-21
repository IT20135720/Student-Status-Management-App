import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
   
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/students', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setStudents(res.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);

    const handleAddStudent = () => {
        navigate('/students/add');
    };

    const handleEdit = (studentId) => {
        navigate(`/edit-student/${studentId}`);
    };

    const handleDeleteStudent = async (studentId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (!confirmDelete) return;
        
        try {
            await axios.delete(`http://localhost:5000/api/students/delete/${studentId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            setStudents(students.filter(student => student.studentId !== studentId));
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <Container>
            <h2 className="mt-5">Admin Dashboard</h2>
            <Button variant="primary" className="my-4" onClick={handleAddStudent}>
                Add New Student
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Age</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.studentId}>
                            <td>{student.studentId}</td>
                            <td>{student.name}</td>
                            <td>
                                {student.image ? (
                                    <img src={student.image} alt="student" width="50" />
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td>{student.age}</td>
                            <td>{student.status || "N/A"}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="mx-1"
                                    onClick={() => handleEdit(student.studentId)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    className="mx-1"
                                    onClick={() => handleDeleteStudent(student.studentId)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminDashboard;
