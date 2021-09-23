import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// properties addCoure is required, function called when Add clicked.
class AddCourse extends Component {
      constructor(props) {
      super(props);
      this.state = {open: false, course:{ } };
    };
    
    handleClickOpen = () => {
      this.setState( {open:true} );
    };

    handleClose = () => {
      this.setState( {open:false} );
    };

    handleChange = (event) => {
      this.setState({course:{course_id: event.target.value}});
    }

  // Save course and close modal form
    handleAdd = () => {
       this.props.addCourse(this.state.course);
       this.handleClose();
    }

    render()  { 
      const columns = [
        { field: 'title', headerName: 'Title', width: 400 },
        { field: 'section', headerName: 'Section', width: 125 },
        { field: 'times', headerName: 'Times', width: 200 },
        { field: 'building', headerName: 'Building', width: 150 },
        { field: 'room', headerName: 'Room',  width: 150 },
        { field: 'grade', headerName: 'Grade', width: 150 },
        {
          field: 'id',
          headerName: '  ',
          sortable: false,
          width: 200,
          renderCell: (params) => (
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginLeft: 16 }} 
                onClick={()=>{this.onDelClick(params.value)}}
              >
                Drop
              </Button>
          )
        }
        ];

        
      return (
          <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
              Add Course
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Course</DialogTitle>
                <DialogContent>
                  <TextField autoFocus fullWidth label="Course Id" name="course_id" onChange={this.handleChange}/> 
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  <Button color="primary" onClick={this.handleAdd}>Add</Button>
                </DialogActions>
              </Dialog>      
          </div>
      ); 
    }
}

// required property:  addCourse is a function to call to perform the Add action
AddCourse.propTypes = {
  addCourse : PropTypes.func.isRequired
}

export default AddCourse;