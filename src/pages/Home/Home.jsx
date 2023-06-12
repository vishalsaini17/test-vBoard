import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Chip, Divider, Drawer, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, } from "@mui/material";
import { AddRounded, BorderColorRounded, Delete } from "@mui/icons-material";

const formDefaultValue = {
  id: 0,
  studentName: '',
  email: '',
  phone: '',
  courseId: [],
}

const Home = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(''); // add | edit
  const [formData, setFormData] = useState(formDefaultValue);
  const [availableCourses, setAvailableCourses] = useState([]);

  const addCourse = (e) => {
    e.preventDefault();
    const date = new Date();
    const id = date.getTime();
    const newFormData = { ...formData, id: id }
    setFormData(newFormData);
    const data = [...studentsData, newFormData];
    setStudentsData(data);
    window.localStorage.setItem('studentsData', JSON.stringify(data));
    handleCloseForm();
  }

  const handleEditClick = (course) => {
    setFormData(course);
    setOpenDrawer('edit');
  }

  const updateStudent = (e) => {
    e.preventDefault();

    const updatedStudents = studentsData.map((course) => {
      return course.id === formData.id ? formData : course;
    });

    setStudentsData(updatedStudents);
    window.localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
    
    handleCloseForm();
  }

  const deleteStudent = (id) => {
    const deletedData = studentsData.filter((student) => student.id !== id);
    window.localStorage.setItem('studentsData', JSON.stringify(deletedData));
    setStudentsData(deletedData);
  }

  function handleCloseForm(){
    setFormData(formDefaultValue);
    setOpenDrawer('');
  }

  useEffect(() => {
    const studentsDataString = window.localStorage.getItem('studentsData');
    const courseDataString = window.localStorage.getItem('courseData');
    if (studentsDataString) {
      setStudentsData(JSON.parse(studentsDataString));
    }
    if (courseDataString) {
      const localStorageData = JSON.parse(courseDataString);
      setAvailableCourses(localStorageData);
    }
  }, []);

  useEffect(() => {
    console.log("form-data", formData)
  }, [formData])

  return (
    <>
      <Paper sx={{ mt: 3, pb: 2 }}>
        <Box sx={{ p: 1, textAlign: 'right', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>Student Table</Box>
          <Button variant="contained" onClick={(e) => { setOpenDrawer('add') }}><AddRounded />Add New</Button>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <Table stickyHeader={true} >
            <TableHead>
              <TableRow>
                <TableCell variant="head">Sr No.</TableCell>
                <TableCell variant="head">Student Name</TableCell>
                <TableCell variant="head">Email</TableCell>
                <TableCell variant="head">Phone</TableCell>
                <TableCell variant="head">course</TableCell>
                <TableCell variant="head">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsData.map((student, i) => {
                return <TableRow key={i} data-id={student.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    {availableCourses.filter((course) => student.courseId.includes(course.id)).map((course) => <Chip key={course.id} label={`${course.courseName}`} variant="outlined" sx={{mr: 1}} />)}
                  </TableCell>
                  <TableCell>
                    <IconButton color="info" onClick={() => { handleEditClick(student) }} title="edit">
                      <BorderColorRounded />
                    </IconButton>
                    <IconButton color="error" onClick={() => { deleteStudent(student.id) }} title="delete">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      <Drawer
        anchor={'right'}
        open={!!openDrawer}
        onClose={handleCloseForm}
      >
        {openDrawer === 'add' && <Box component={`form`} onSubmit={addCourse} sx={{ p: 2, pt: 10 }}>
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Add New Student</Typography>
          <TextField fullWidth sx={{ mb: 3 }} label="Student Name" value={formData.studentName} onChange={(e) => { setFormData({ ...formData, studentName: e.target.value }) }} />
          <TextField fullWidth sx={{ mb: 3 }} label="Email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} />
          <TextField fullWidth sx={{ mb: 3 }} label="Phone" value={formData.phone} onChange={(e) => { setFormData({ ...formData, phone: e.target.value }) }} />

          <Autocomplete
            disablePortal
            multiple
            options={availableCourses}
            getOptionLabel={(item) => `${item.courseName}`}
            renderInput={(params) => <TextField {...params} label="Courses" />}
            onChange={(e, values) => {
              const idArr = values.map((value) => value.id);
              setFormData({ ...formData, courseId: idArr });
            }}
            sx={{ mb: 3 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Add Student</Button>
          </Box>
        </Box>}

        {openDrawer === 'edit' && <Box component={`form`} onSubmit={updateStudent} sx={{ p: 2, pt: 10 }}>
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Edit Student</Typography>
          <TextField fullWidth sx={{ mb: 3 }} label="Student Name" value={formData.studentName} onChange={(e) => { setFormData({ ...formData, studentName: e.target.value }) }} />
          <TextField fullWidth sx={{ mb: 3 }} label="Email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} />
          <TextField fullWidth sx={{ mb: 3 }} label="Phone" value={formData.phone} onChange={(e) => { setFormData({ ...formData, phone: e.target.value }) }} />
          <Autocomplete
            disablePortal
            multiple
            options={availableCourses}
            getOptionLabel={(item) => `${item.subjectName}`}
            renderInput={(params) => <TextField {...params} label="Courses" />}
            defaultValue={availableCourses.filter((course) => formData.courseId.includes(course.id))}
            onChange={(e, values) => {
              const arrId = values.map((value) => value.id);
              setFormData({ ...formData, courseId: arrId });
            }}
            sx={{ mb: 3 }}
          />
          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Update Student</Button>
          </Box>
        </Box>}
      </Drawer>
    </>
  );
}

export default Home;