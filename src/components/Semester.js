import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Link } from 'react-router-dom'
import {SEMESTER_LIST} from '../constants.js'

class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {year: 0, semester: ''};
    };
 
 
  onRadioClick = (id) => {
    this.setState({year: SEMESTER_LIST[id].year, semester: SEMESTER_LIST[id].name});
  }
  
  render() {
    const rows = SEMESTER_LIST.map((semester, index) => (
       <div>
          <label key={semester.id}>
              <input type="radio"
               value={semester.id} 
               name="semester"
               key={semester.id}
               onChange={(event)=>this.onRadioClick(event.target.value)}
              />
            {semester.year +'  '+ semester.name}
          </label> 
       </div>
       )); 
    return (
      <div align="left" >
            Choose semester: 
            <p/> 
            <RadioGroup vertical="true">
              <div align="left"> {rows} </div>
            </RadioGroup>
            <p/> 
            <Button component={Link} to={{pathname:'/schedule' , year:this.state.year, semester:this.state.semester}} 
                    variant="outlined" color="primary" style={{margin: 10}}>
              Get Schedule
            </Button>
      </div>
    )
  }
}
export default Semester;