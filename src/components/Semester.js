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

// user selects from a list of  (year, semester) values
class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {selected: SEMESTER_LIST.length-1};
    }
 
   onRadioClick = (event) => {
    console.log("Semester.onRadioClick "+JSON.stringify(event.target.value));
    this.setState({selected: event.target.value});
  }
  
  addStudent = (student) => {
    const token = Cookies.get('XSRF-TOKEN');
  
    fetch(`${SERVER_URL}/student`,
    { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json',
                  'X-XSRF-TOKEN': token  }, 
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
      const icolumns = [
      {
        field: 'id',
        headerName: 'Year',
        width: 200,
        renderCell: (params) => (
          <div>
            <Radio
              checked={params.row.id == this.state.selected}
              onChange={this.onRadioClick}
              value={params.row.id}
              color="default"
              size="small"
            />
            { SEMESTER_LIST[params.row.id].year }
          </div>
        )
      },
      { field: 'name', headerName: 'Semester', width: 200 }
      ];       
       
    return (
       <div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Schedule - select a term
               </Typography>
            </Toolbar>
         </AppBar>
         <div align="left" >
              <div style={{ height: 400, width: '100%', align:"left"   }}>
                <DataGrid   rows={SEMESTER_LIST} columns={icolumns} />
              </div>                
              <Button component={Link} 
                      to={{pathname:'/schedule' , 
                      year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name}} 
                variant="outlined" color="primary" style={{margin: 10}}>
                Get Schedule
              </Button>
              <Button id="addStudent"> 
                <AddStudent addStudent = {this.addStudent} />
              </Button>
          </div>
              <ToastContainer autoClose={9000} />   
      </div>
    )
  }
}
export default Semester;
