import React from 'react';

const StudentList = ({ students, onEdit, fetchStudents }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'DELETE',
      });
      fetchStudents();  // Cập nhật danh sách sau khi xóa
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <ul>
      {students.map((student) => (
        <li key={student._id}>
          <img 
            src={`http://localhost:5000/uploads/${student.avatar}`} 
            alt={student.name} 
            width="50" 
            height="50" 
          />
          <p>{student.name} - Age: {student.age}</p>
          <button onClick={() => onEdit(student)}>Edit</button>
          <button onClick={() => handleDelete(student._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;
