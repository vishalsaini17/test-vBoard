import { useEffect, useState } from "react";
import { Box, Button, Divider, Drawer, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, } from "@mui/material";
import { AddRounded } from "@mui/icons-material";

const Courses = () => {
  const [courseData, setCourseData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(''); // add | edit
  const [selectedCourse, setSelectedCourse] = useState({});

  const addCourse = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const date = new Date();
    const id = date.getTime();
    const formData = {
      id: id,
      subject: form.subject.value,
      course: form.courseName.value,
      price: form.price.value
    }

    const newData = [...courseData, formData];
    setCourseData(newData);
    window.localStorage.setItem('courseData', JSON.stringify(newData));
    setOpenDrawer('')
  }

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setOpenDrawer('edit');
  }

  const updateCourse = (e) => {
    e.preventDefault();

    const updatedCourse = courseData.map((course) => {
      return course.id === selectedCourse.id ? selectedCourse : course;
    });

    setCourseData(updatedCourse);
    window.localStorage.setItem('courseData', JSON.stringify(updatedCourse));
    setOpenDrawer('');
    setSelectedCourse({});
  }

  const deleteCourse = (id) => {
    const deletedData = courseData.filter((course) => course.id !== id);
    window.localStorage.setItem('courseData', JSON.stringify(deletedData));
    setCourseData(deletedData);
  }

  useEffect(() => {
    const dataString = window.localStorage.getItem('courseData');
    if (dataString) {
      setCourseData(JSON.parse(dataString));
    }
  }, []);

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
                <TableCell variant="head">Subject</TableCell>
                <TableCell variant="head">Course</TableCell>
                <TableCell variant="head">Price</TableCell>
                <TableCell variant="head">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseData.map((course, i) => {
                return <TableRow key={i} data-id={course.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{course.subject}</TableCell>
                  <TableCell>{course.course}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>
                    <button onClick={() => { handleEditClick(course) }}>edit</button>
                    <button onClick={() => { deleteCourse(course.id) }}>delete</button>
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
        onClose={() => { setOpenDrawer('') }}
      >
        {openDrawer === 'add' && <Box component={`form`} onSubmit={addCourse} sx={{ p: 2, pt: 10 }}>
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Add New Course</Typography>
          <TextField fullWidth sx={{ mb: 3 }} inputProps={{ id: "subject" }} label="Subject" />
          <TextField fullWidth sx={{ mb: 3 }} inputProps={{ id: "courseName" }} label="Course Name" />
          <TextField fullWidth sx={{ mb: 3 }} inputProps={{ id: "price" }} label="Price" />
          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Add Course</Button>
          </Box>
        </Box>}

        {openDrawer === 'edit' && <Box component={`form`} onSubmit={updateCourse} sx={{ p: 2, pt: 10 }}>
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Edit Course</Typography>
          <input hidden id="courseId" value={selectedCourse.id} />
          <TextField fullWidth sx={{ mb: 3 }} label="Subject" value={selectedCourse.subject} onChange={(e) => { setSelectedCourse((values) => ({ ...values, subject: e.currentTarget.value })) }} />
          <TextField fullWidth sx={{ mb: 3 }} label="Course Name" value={selectedCourse.course} onChange={(e) => { setSelectedCourse((values) => ({ ...values, course: e.currentTarget.value })) }} />
          <TextField fullWidth sx={{ mb: 3 }} label="Price" value={selectedCourse.price} onChange={(e) => { setSelectedCourse((values) => ({ ...values, price: e.currentTarget.value })) }} />
          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Add Course</Button>
          </Box>
        </Box>}
      </Drawer>
    </>
  );
}

export default Courses;