import React, { Component, Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import {  KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Grid } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { render } from "@testing-library/react";

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Comfortaa',
            'cursive',
        ].join(','),
    },});

class InlineTimePickerDemo extends Component {
    
    render(){
        return (
            <ThemeProvider theme={theme}>
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
                    minDateMessage="Date should not be before minimal date"
                    format="yyyy-MM-dd"
                />
    
                    
                 <div style={{width: 100}} />
    
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time"
                    value={this.props.selectedDate}
                    onChange={time => this.props.dateCallback(time)}
                    format="hh:mm a"
                    invalidDateMessage="Invalid Date Format"
                />
    
                </Grid>
               
                
            </MuiPickersUtilsProvider>
                </ThemeProvider>
        
        );
    }
    
}

export default InlineTimePickerDemo;