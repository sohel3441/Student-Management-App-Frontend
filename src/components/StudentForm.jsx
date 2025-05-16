import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StudentForm = () => {
  // Initialize form state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: '',
    email: '',
  });

  // Update form values on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, age, course, email } = formData;

    // Basic validation
    if (!name || !age || !course || !email) {
      alert('All fields are required');
      return;
    }

    try {
      // Send POST request to create new student
      await axios.post(`${API_BASE_URL}/students`, formData);
      alert('Student created successfully!');

      // Reset form after successful submission
      setFormData({ name: '', age: '', course: '', email: '' });
    } catch (err) {
      console.error(err);
      alert('Error while creating student');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentForm;
