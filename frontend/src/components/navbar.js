import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext'; // Import the useAuth hook

const NavigationBar = () => {
    const { isLoggedIn, logout } = useAuth(); // Get the login state and logout function
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/login'); // Redirect to login page
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                {/* Aligning the label to the left with increased letter spacing */}
                <label className="d-flex align-items-center" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    <span style={{ color: '#FFD700', letterSpacing: '2px' }}>Admin</span>
                </label>

                {/* Navigation Links with a large gap between "Admin" and the other items */}
                <Nav className="ml-auto">
                    {isLoggedIn ? (
                        <>
                            <Nav.Link as={Link} to="/admin/dashboard" className="mr-4">Dashboard</Nav.Link>
                            <Nav.Link onClick={handleLogout} className="mr-4">Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login" className="mr-4">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register" className="mr-4">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
