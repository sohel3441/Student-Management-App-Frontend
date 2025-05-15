import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<StudentForm />} />
      <Route path="/students" element={<StudentList />} />
    </Routes>
  );
};

export default App;
