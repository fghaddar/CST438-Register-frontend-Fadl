import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import {DataGrid} from '@material-ui/data-grid';
import {SEMESTER_LIST} from '../constants.js'
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import AddStudent from './AddStudent';

class Admin extends Component {
    constructor(props) {
      super(props);
    }
  
    addStudent = (student) => {
      const token = Cookies.get('XSRF-TOKEN');
  
      fetch(`${SERVER_URL}student`,
      { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': token  }, 
                    credentials: 'include',
        body: JSON.stringify(student)
        })
        .then(res => {
          if (res.ok) {
            toast.success("Student successfully added", {
                position: toast.POSITION.BOTTOM_LEFT
            });
          } else {
            toast.error("Error when adding. Either email is in use, or email/student name are null", {
            position: toast.POSITION.BOTTOM_LEFT
            });
          console.error('Post http status =' + res.status);
          }})
        .catch(err => {
          toast.error("Error when adding. Either email is in use, or email/student name are null", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
          })
      }

  render() {         
       
    return (
       <div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Add a student
               </Typography>
            </Toolbar>
         </AppBar>
         <div align="left" >            
              <Button> 
                <AddStudent addStudent = {this.addStudent} />
              </Button>
          </div>
              <ToastContainer autoClose={9000} />   
      </div>
    )
  }
}
export default Admin;
