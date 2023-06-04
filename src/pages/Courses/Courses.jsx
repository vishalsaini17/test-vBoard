import { Button, Grid, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const Courses = () => {
  const [courseData, setCourseData] = useState([]);

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

    return false;
  }

  const updateCourse = (id)=>{

  }

  const deleteCourse = (id) => {
    const deletedData = courseData.filter((course)=> course.id !== id);
    window.localStorage.setItem('courseData', JSON.stringify(deletedData));
    setCourseData(deletedData);
  }

  useEffect(()=>{
    const dataString = window.localStorage.getItem('courseData');
    if(dataString){
      setCourseData(JSON.parse(dataString));
    }
  }, []);

  return (
    <>
      <Paper sx={{p: 2}}>
        <form onSubmit={addCourse}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField fullWidth inputProps={{ id: "subject" }} label="Subject" />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth inputProps={{ id: "courseName" }} label="Course Name" />
            </Grid>
            <Grid item xs={2}>
              <TextField fullWidth inputProps={{ id: "price" }} label="Price" />
            </Grid>
            <Grid item xs={2}>
              <Button type="submit" fullWidth variant="contained" size="large">Add Course</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Paper sx={{p: 2, mt: 3}}>
      <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Subject</th>
              <th>Course</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((course, i) => {
              return <tr data-id={course.id}>
                <td>{i + 1}</td>
                <td>{course.subject}</td>
                <td>{course.course}</td>
                <td>{course.price}</td>
                <td>
                  <button onClick={() => { updateCourse(course.id) }}>edit</button>
                  <button onClick={() => { deleteCourse(course.id) }}>delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </Paper>
    </>
  );
}

export default Courses;