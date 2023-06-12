import { useEffect, useState } from "react";
import { Box, Button, Divider, Drawer, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, } from "@mui/material";
import { AddRounded, BorderColorRounded, Delete } from "@mui/icons-material";

const Subjects = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(''); // add | edit
  const [selectedSubject, setSelectedSubject] = useState({});

  const addCourse = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const date = new Date();
    const id = date.getTime();
    const formData = {
      id: id,
      subjectName: form.subjectName.value,
      subjectVolume: form.subjectVolume.value,
    }

    const newData = [...subjectData, formData];
    setSubjectData(newData);
    window.localStorage.setItem('subjectData', JSON.stringify(newData));
    setOpenDrawer('')
  }

  const handleEditClick = (subject) => {
    setSelectedSubject(subject);
    setOpenDrawer('edit');
  }

  const updateSubject = (e) => {
    e.preventDefault();

    const updatedSubject = subjectData.map((subject) => {
      return subject.id === selectedSubject.id ? selectedSubject : subject;
    });

    setSubjectData(updatedSubject);
    window.localStorage.setItem('subjectData', JSON.stringify(updatedSubject));
    setOpenDrawer('');
    setSelectedSubject({});
  }

  const deleteSubject = (id) => {
    const deletedData = subjectData.filter((subject) => subject.id !== id);
    window.localStorage.setItem('subjectData', JSON.stringify(deletedData));
    setSubjectData(deletedData);
  }

  useEffect(() => {
    const dataString = window.localStorage.getItem('subjectData');
    if (dataString) {
      setSubjectData(JSON.parse(dataString));
    }
  }, []);

  return (
    <>
      <Paper sx={{ mt: 3, pb: 2 }}>
        <Box sx={{ p: 1, textAlign: 'right', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>Subject Table</Box>
          <Button variant="contained" onClick={(e) => { setOpenDrawer('add') }}><AddRounded />Add New</Button>
        </Box>
        <Divider />
        <Box sx={{ p: 1 }}>
          <Table stickyHeader={true} >
            <TableHead>
              <TableRow>
                <TableCell variant="head">Sr No.</TableCell>
                <TableCell variant="head">Subject Name</TableCell>
                <TableCell variant="head">Volume</TableCell>
                <TableCell variant="head">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectData.map((subject, i) => {
                return <TableRow key={i} data-id={subject.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{subject.subjectName}</TableCell>
                  <TableCell>{subject.subjectVolume}</TableCell>
                  <TableCell>
                    <IconButton color="info" onClick={() => { handleEditClick(subject) }} title="edit">
                      <BorderColorRounded />
                    </IconButton>
                    <IconButton color="error" onClick={() => { deleteSubject(subject.id) }} title="delete">
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
        onClose={() => { setOpenDrawer('') }}
      >
        {openDrawer === 'add' && <Box component={`form`} onSubmit={addCourse} sx={{ p: 2, pt: 10 }}>
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Add New Course</Typography>
          <TextField fullWidth sx={{ mb: 3 }} inputProps={{ id: "subjectName" }} label="Subject Name" />
          <TextField fullWidth sx={{ mb: 3 }} inputProps={{ id: "subjectVolume" }} label="Volume" />
          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Add Subject</Button>
          </Box>
        </Box>}

        {openDrawer === 'edit' && <Box component={`form`} onSubmit={updateSubject} sx={{ p: 2, pt: 10 }}>
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Edit Subject</Typography>
          <input hidden id="courseId" value={selectedSubject.id} />
          <TextField fullWidth sx={{ mb: 3 }} label="Subject Name" value={selectedSubject.subjectName} onChange={(e) => { setSelectedSubject((values) => ({ ...values, subjectName: e.target.value })) }} />
          <TextField fullWidth sx={{ mb: 3 }} label="Volume" value={selectedSubject.subjectVolume} onChange={(e) => { setSelectedSubject((values) => ({ ...values, subjectVolume: e.target.value })) }} />
          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Update Subject</Button>
          </Box>
        </Box>}
      </Drawer>
    </>
  );
}

export default Subjects;