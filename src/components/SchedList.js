import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {DataGrid} from '@material-ui/data-grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddCourse from './AddCourse';

// properties location.year and location.semester required
class SchedList extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: [] };
  } 
  
  componentDidMount() {
    this.fetchCourses();
  }
  
  fetchCourses = () => {
    console.log("SchedList.fetchCourses");
    const token = Cookies.get('XSRF-TOKEN');
    
    fetch(`${SERVER_URL}/schedule?year=${this.props.location.year}&semester=${this.props.location.semester}`, 
      {  
        method: 'GET', 
        headers: { 'X-XSRF-TOKEN': token }, 
        credentials: 'include'
      } )
    .then((response) => response.json()) 
    .then((responseData) => { 
      console.log("FETCH RESP DATA:"+responseData.courses);
      if (Array.isArray(responseData.courses)) {
        this.setState({ 
          courses: responseData.courses,
        });
      } else {
        toast.error("Fetch failed.", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }        
    })
    .catch(err => console.error(err)); 
  }

  // Drop Course 
  onDelClick = (course_id) => {
    if (window.confirm('Are you sure you want to drop the course?')) {
      const token = Cookies.get('XSRF-TOKEN');
      
      fetch(`${SERVER_URL}/schedule/${course_id}`,
        {
          method: 'DELETE',
          headers: { 'X-XSRF-TOKEN': token }, 
          credentials: 'include'
        })
    .then(res => {
        if (res.ok) {
          toast.success("Course successfully dropped", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          this.fetchCourses();
        } else {
          toast.error("Course drop failed", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Delete http status =' + res.status);
    }})
      .catch(err => {
        toast.error("Course drop failed", {
              position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
      }) 
    } 
  }

  // Add course
  addCourse = (course) => {
    const token = Cookies.get('XSRF-TOKEN');
 
    fetch(`${SERVER_URL}/schedule`,
      { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json',
                   'X-XSRF-TOKEN': token  }, 
        credentials: 'include', 
        body: JSON.stringify(course)
      })
    .then(res => {
        if (res.ok) {
          toast.success("Course successfully added", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          this.fetchCourses();
        } else {
          toast.error("Error when adding", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('POST http status =' + res.status);
        }})
    .catch(err => {
      toast.error("Error when adding", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
    })
  } 

  render() {
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
  
  return(
      <div>
          <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  { 'Schedule ' + this.props.location.year + ' ' +this.props.location.semester }
                </Typography>
            </Toolbar>
          </AppBar>
          <div className="App">
            <Grid container>
              <Grid item>
                  <AddCourse addCourse={this.addCourse}  />
              </Grid>
            </Grid>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={this.state.courses} columns={columns} />
            </div>
            <ToastContainer autoClose={1500} />   
          </div>
      </div>
      ); 
  }
}

// required properties:  location.year integer , location.semester string
SchedList.propTypes = {
  location: (properties, propertyName, componentName) => {
       if ( (!Number.isInteger(properties.location.year)) || !(typeof properties.location.semester === 'string') || (properties.location.semester instanceof String ))
         {
         return new Error('AddCourse: Missing or invalid property year or semester.');
       }
    }
  }

 
export default SchedList;