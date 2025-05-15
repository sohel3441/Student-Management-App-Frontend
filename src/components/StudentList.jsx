import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: '',
    email: '',
  });

  // Load all students when the component mounts
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Unable to load students. Please try again later.');
    }
  };

  const handleDelete = async (studentId) => {
    const confirmed = window.confirm('Are you sure you want to delete this student?');
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/students/${studentId}`);
      alert('Student deleted successfully.');
      loadStudents();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Something went wrong while deleting the student.');
    }
  };

  const handleEdit = (student) => {
    setEditingStudentId(student._id);
    setFormData({
      name: student.name,
      age: student.age,
      course: student.course,
      email: student.email,
    });
  };

  const handleCancel = () => {
    setEditingStudentId(null);
    setFormData({ name: '', age: '', course: '', email: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (studentId) => {
    try {
      await axios.put(`${API_BASE_URL}/students/${studentId}`, formData);
      alert('Student updated successfully.');
      setEditingStudentId(null);
      loadStudents();
    } catch (error) {
      console.error('Update failed:', error);
      alert('Something went wrong while updating the student.');
    }
  };

  return (
    <div className="list-container">
      <h2>Student List</h2>

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Course</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => {
              const isEditing = editingStudentId === student._id;

              return (
                <tr key={student._id}>
                  {isEditing ? (
                    <>
                      <td>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <button className="update-btn" onClick={() => handleUpdate(student._id)}>
                          Save
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.course}</td>
                      <td>{student.email}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(student)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(student._id)}>
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
