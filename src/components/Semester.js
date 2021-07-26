import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import {DataGrid} from '@material-ui/data-grid';
import { Link } from 'react-router-dom'
import {SEMESTER_LIST} from '../constants.js'

class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {selected: 0 };
    };
 
 
   onRadioClick = (event) => {
    console.log("on click "+JSON.stringify(event.target.value));
    this.setState({selected: event.target.value});
  }
  
  render() {
      const irows = SEMESTER_LIST.map((row, index) => ( { id: index, ...row } )); 
    
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
      <div align="left" >
            Select a term: 
            <p/> 
            <div style={{ height: 400, width: '100%', align:"left"   }}>
                <DataGrid rows={irows} columns={icolumns} />
              </div>  
            <p/> 
            <Button component={Link} 
                    to={{pathname:'/schedule' , 
                    year:SEMESTER_LIST[this.state.selected].year, 
                    semester:SEMESTER_LIST[this.state.selected].name}} 
              variant="outlined" color="primary" style={{margin: 10}}>
              Get Schedule
            </Button>
      </div>
    )
  }
}
export default Semester;