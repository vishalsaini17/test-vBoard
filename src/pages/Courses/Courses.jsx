import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Chip, Divider, Drawer, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, } from "@mui/material";
import { AddRounded, BorderColorRounded, Delete } from "@mui/icons-material";

const formDefaultValue = {
  id: 0,
  courseName: '',
  subjectsId: [],
  price: 0
}

const Courses = () => {
  const [courseData, setCourseData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(''); // add | edit
  const [formData, setFormData] = useState(formDefaultValue);
  const [availableSubject, setAvailableSubject] = useState([]);

  const addCourse = (e) => {
    e.preventDefault();
    const date = new Date();
    const id = date.getTime();
    const newFormData = { ...formData, id: id }
    setFormData(newFormData);
    const data = [...courseData, newFormData];
    setCourseData(data);
    window.localStorage.setItem('courseData', JSON.stringify(data));
    handleCloseForm();
  }

  const handleEditClick = (course) => {
    setFormData(course);
    setOpenDrawer('edit');
  }

  const updateCourse = (e) => {
    e.preventDefault();

    const updatedCourse = courseData.map((course) => {
      return course.id === formData.id ? formData : course;
    });

    setCourseData(updatedCourse);
    window.localStorage.setItem('courseData', JSON.stringify(updatedCourse));
    
    handleCloseForm();
  }

  const deleteCourse = (id) => {
    const deletedData = courseData.filter((course) => course.id !== id);
    window.localStorage.setItem('courseData', JSON.stringify(deletedData));
    setCourseData(deletedData);
  }

  function handleCloseForm(){
    setFormData(formDefaultValue);
    setOpenDrawer('');
  }

  useEffect(() => {
    const courseDataString = window.localStorage.getItem('courseData');
    const subjectDataString = window.localStorage.getItem('subjectData');
    if (courseDataString) {
      setCourseData(JSON.parse(courseDataString));
    }
    if (subjectDataString) {
      const localStorageData = JSON.parse(subjectDataString);
      setAvailableSubject(localStorageData);
    }
  }, []);

  useEffect(() => {
    console.log("form-data", formData)
  }, [formData])

  return (
    <>
      <Paper sx={{ mt: 3, pb: 2 }}>
        <Box sx={{ p: 1, textAlign: 'right', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>Course Table</Box>
          <Button variant="contained" onClick={(e) => { setOpenDrawer('add') }}><AddRounded />Add New</Button>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <Table stickyHeader={true} >
            <TableHead>
              <TableRow>
                <TableCell variant="head">Sr No.</TableCell>
                <TableCell variant="head">Course Name</TableCell>
                <TableCell variant="head">Subjects</TableCell>
                <TableCell variant="head">Price</TableCell>
                <TableCell variant="head">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseData.map((course, i) => {
                return <TableRow key={i} data-id={course.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>
                    {availableSubject.filter((subject) => course.subjectsId.includes(subject.id)).map((subject) => <Chip key={subject.id} label={`${subject.subjectName} : ${subject.subjectVolume}`} variant="outlined" sx={{mr: 1}} />)}
                  </TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>
                    <IconButton color="info" onClick={() => { handleEditClick(course) }} title="edit">
                      <BorderColorRounded />
                    </IconButton>
                    <IconButton color="error" onClick={() => { deleteCourse(course.id) }} title="delete">
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
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Add New Course</Typography>
          <TextField fullWidth sx={{ mb: 3 }} label="Course Name" value={formData.courseName} onChange={(e) => { setFormData({ ...formData, courseName: e.target.value }) }} />

          <Autocomplete
            disablePortal
            multiple
            options={availableSubject}
            getOptionLabel={(item) => `${item.subjectName} : ${item.subjectVolume}`}
            renderInput={(params) => <TextField {...params} label="Subjects" />}
            onChange={(e, values) => {
              const idArr = values.map((value) => value.id);
              setFormData({ ...formData, subjectsId: idArr });
            }}
            sx={{ mb: 3 }}
          />

          <TextField fullWidth sx={{ mb: 3 }} label="Price" value={formData.price} onChange={(e) => { setFormData({ ...formData, price: e.target.value }) }} />
          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Add Course</Button>
          </Box>
        </Box>}

        {openDrawer === 'edit' && <Box component={`form`} onSubmit={updateCourse} sx={{ p: 2, pt: 10 }}>
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Edit Course</Typography>
          <TextField fullWidth sx={{ mb: 3 }} label="Course Name" value={formData.courseName} onChange={(e) => { setFormData({ ...formData, courseName: e.target.value }) }} />
          <Autocomplete
            disablePortal
            multiple
            options={availableSubject}
            getOptionLabel={(item) => `${item.subjectName} : ${item.subjectVolume}`}
            renderInput={(params) => <TextField {...params} label="Subjects" />}
            defaultValue={availableSubject.filter((subject) => formData.subjectsId.includes(subject.id))}
            onChange={(e, values) => {
              const arrId = values.map((value) => value.id);
              setFormData({ ...formData, subjectsId: arrId });
            }}
            sx={{ mb: 3 }}
          />
          <TextField fullWidth sx={{ mb: 3 }} label="Price" value={formData.price} onChange={(e) => { setFormData({ ...formData, price: e.target.value }) }} />
          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Update Course</Button>
          </Box>
        </Box>}
      </Drawer>
    </>
  );
}

export default Courses;