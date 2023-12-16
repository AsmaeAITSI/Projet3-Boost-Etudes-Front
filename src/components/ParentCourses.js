import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const ParentCourses = ({ user }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/auth/courses/parent/${user.id}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des cours :', error);
      }
    };

    fetchCourses();
  }, [user.id]);

  return (
    <Paper elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Enseignant</TableCell>
            <TableCell>Salle</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Heure de début</TableCell>
            <TableCell>Heure de fin</TableCell>
            <TableCell>Matière</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.courseId}>
              <TableCell>{`${course.teacherFirstName} ${course.teacherLastName}`}</TableCell>
              <TableCell>{`${course.classroomNumber}`}</TableCell>
              <TableCell>{`${course.date}`}</TableCell>
              <TableCell>{`${course.startTime}`}</TableCell>
              <TableCell>{`${course.endTime}`}</TableCell>
              <TableCell>{`${course.subject}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ParentCourses;
