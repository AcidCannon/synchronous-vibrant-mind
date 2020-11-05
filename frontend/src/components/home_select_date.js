import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import {  KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Grid } from "@material-ui/core";

function InlineTimePickerDemo() {
    const [selectedDate, handleDateChange] = useState(new Date());

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
                value={selectedDate}
                placeholder="10/10/2018"
                onChange={date => handleDateChange(date)}
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
                value={selectedDate}
                onChange={handleDateChange}
                // KeyboardButtonProps={{
                //     'aria-label': 'change time',
                //   }}
            />

            </Grid>
           
            
        </MuiPickersUtilsProvider>
    );
}

export default InlineTimePickerDemo;
