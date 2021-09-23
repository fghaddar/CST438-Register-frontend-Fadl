import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'react-toastify/dist/ReactToastify.css';

// properties addCoure is required, function called when Add clicked.
class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, student:{ name: null, email: null, statusCode: 0, status: "Good"}};
    };

    handleClickOpen = () => {
        this.setState( {open:true} );
    };

    handleClose = () => {
        this.setState( {open:false} );
    };

    handleChangeName = (event) => {
        
      this.setState({student:{name: event.target.value,
      email: this.state.student.email,
      statusCode: 0,
      status: "Good"}});
    }

    handleChangeEmail = (event) => {
        
          this.setState({student:{name: this.state.student.name,
          email: event.target.value,
          statusCode: 0,
          status: "Good"}});
    }

    // Save student and close modal form
    addStudent = () => {
      this.props.addStudent(this.state.student);
      this.handleClose();
      this.setState({student:{name: null, email: null}})
    }

    render()  {
        return (
            <div>
              <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
                Add Student
              </Button>
              <Dialog open={this.state.open} onClose={this.handleClose}>
                  <DialogTitle>Add Student</DialogTitle>
                  <DialogContent>
                  <TextField autoFocus fullWidth label="Student Name" name="name" value = {this.state.student.name} onChange={this.handleChangeName}/> 
                    <TextField autoFocus fullWidth label="Student Email" name="email" value = {this.state.student.email} onChange={this.handleChangeEmail}/> 
                  </DialogContent>
                  <DialogActions>
                    <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                    <Button color="primary" onClick={this.addStudent}>Add</Button>
                  </DialogActions>
                </Dialog>      
            </div>
        ); 
      }
};

// required property:  addStudent is a function to call to perform the Add action
AddStudent.propTypes = {
  addStudent : PropTypes.func.isRequired
}

export default AddStudent;