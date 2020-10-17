import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function InlineTimePickerDemo() {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                variant="inline"
                label="Date"
                value={selectedDate}
                onChange={handleDateChange}
            />

            <TimePicker
                variant="inline"
                label="Time"
                value={selectedDate}
                onChange={handleDateChange}
            />
        </MuiPickersUtilsProvider>
    );
}

export default InlineTimePickerDemo;
