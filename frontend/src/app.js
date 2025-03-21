import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update here
import Login from './components/login';
import Register from './components/register';
import AdminDashboard from './components/admindashboard';
import Navbar from './components/navbar';
import AddStudent from './components/addstudent';
import EditStudent from './components/updatestudent';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>  
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/edit-student/:studentId" element={<EditStudent />} />
      </Routes>
    </Router>
  );
}


export default App;
