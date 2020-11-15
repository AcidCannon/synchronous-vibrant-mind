import React, { Component, Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import {  KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { render } from "@testing-library/react";


class InlineTimePickerDemo extends Component {
    
    // state = {
    //     selectedDate:new Date()
    // }
    
    render(){
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid 
                container 
                justify="flex-start"
                alignItems="center" 
                direction="row" 
                >
                
                <KeyboardDatePicker
                    // clearable
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={this.props.selectedDate}
                    onChange={date => this.props.dateCallback(date)}
                    minDate={new Date()}
                    format="yyyy-MM-dd"
                />
    
                    
                {/* <KeyboardDatePicker 
                    disableToolbar
                    autoOk
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                /> */}
                 <div style={{width: 100}} />
    
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time"
                    value={this.props.selectedDate}
                    onChange={time => this.props.dateCallback(time)}
                    // KeyboardButtonProps={{
                    //     'aria-label': 'change time',
                    //   }}
                />
    
                </Grid>
               
                
            </MuiPickersUtilsProvider>
        
        );
    }
    
}

export default InlineTimePickerDemo;
