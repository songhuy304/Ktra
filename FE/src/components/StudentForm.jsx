import React, { useState, useEffect } from 'react';

const StudentForm = ({ currentStudent, setCurrentStudent, fetchStudents }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (currentStudent) {
      setName(currentStudent.name);
      setAge(currentStudent.age);
      setAvatar(null);
    } else {
      setName('');
      setAge('');
      setAvatar(null);
    }
  }, [currentStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    if (avatar) formData.append('avatar', avatar);

    try {
      // Gửi dữ liệu đến API backend
      if (currentStudent && currentStudent._id) {
        // Cập nhật sinh viên
        await fetch(`http://localhost:5000/api/students/${currentStudent._id}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // Thêm sinh viên mới
        await fetch('http://localhost:5000/api/students', {
          method: 'POST',
          body: formData,
        });
      }

      // Sau khi thêm sinh viên mới, gọi lại fetchStudents để cập nhật danh sách
      fetchStudents();
      setCurrentStudent(null);  // Xóa dữ liệu sau khi thêm/cập nhật
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Student Age"
        required
      />
      <input
        type="file"
        onChange={(e) => setAvatar(e.target.files[0])}
      />
      <button type="submit">{currentStudent ? 'Update Student' : 'Add Student'}</button>
    </form>
  );
};

export default StudentForm;
