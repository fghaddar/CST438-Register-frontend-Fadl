import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AddCourse = (props) => {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState({ });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCourse({...course, [event.target.name]: event.target.value});
  }

  // Save course and close modal form
  const handleAdd = () => {
    props.addCourse(course);
    handleClose();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
        Add Course
      </Button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Course</DialogTitle>
          <DialogContent>
            <TextField autoFocus fullWidth label="Course Id" name="course_id" 
              value={course.course_id} onChange={handleChange}/> 
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>Cancel</Button>
            <Button color="primary" onClick={handleAdd}>Add</Button>
          </DialogActions>
        </Dialog>      
    </div>
  );
};

export default AddCourse;