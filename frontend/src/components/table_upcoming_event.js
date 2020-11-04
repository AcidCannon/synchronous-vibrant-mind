import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import moment from 'moment';


// import { Blob } from 'react-blob';

import ICalendarLink from "react-icalendar-link";

const columns = [
  { id: 'player', label: 'Player', minWidth: 170 },
  { id: 'gamedate', label: 'Game date', minWidth: 100 },
  {
    id: 'game_start_time',
    label: 'Game start time',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'download_calendar',
    label: 'Download Calendar',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'join_meeting',
    label: 'Join Meeting',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
];

// This resolves to nothing and doesn't affect browser history
const dudUrl = 'javascript:;';

function createData(player, gamedate, game_start_time, download_calendar, join_meeting) {
  // const density = game_start_time / size;
  return { player, gamedate, game_start_time, download_calendar, join_meeting };
}

// This is a function return events, may use later
function CreateCalendarEvent(title, description, startTime, endTime, location) {
  return { title, description, startTime, endTime, location };
}
//This is a temporary event
const event = {
  title: "My Title",
  description: "My Description",
  startTime: "2018-10-07T10:30:00+10:00",
  endTime: "2018-10-07T12:00:00+10:00",
  location: "10 Carlotta St, Artarmon NSW 2064, Australia",
}


const rows = [
  createData('Alpha', '2020-01-23', 8,<ICalendarLink event={event}>Calendar.ics</ICalendarLink>, <Button variant="contained" color="primary" onClick={()=> window.open("https://vibrant-minds.org/login/", "_blank")}>Join</Button>),
  createData('Bdong', '2020-05-26', 8, <ICalendarLink event={event}>Calendar.ics</ICalendarLink>, <Button variant="contained" color="primary" onClick={()=> window.open("https://vibrant-minds.org/", "_blank")}>Join</Button>),
  createData('Zoe', '2020-06-01', 8, <Link href={dudUrl}>Calendar.ics</Link>, <Button variant="contained" color="primary" onClick={()=> window.open("https://vibrant-minds.org/login/", "_blank")}>Join</Button>),
  createData('Zuhao', '2020-06-01', 8, <Link href={dudUrl}>Calendar.ics</Link>, <Button variant="contained" color="primary" onClick={()=> window.open("https://vibrant-minds.org/login/", "_blank")}>Join</Button>),
  createData('Zijian', '2020-06-01', 8, <Link href={dudUrl}>Calendar.ics</Link>, <Button variant="contained" color="primary" onClick={()=> window.open("https://vibrant-minds.org/login/", "_blank")}>Join</Button>),
  createData('Zihao', '2020-06-01', 8, <Link href={dudUrl}>Calendar.ics</Link>, <Button variant="contained" color="primary" onClick={()=> window.open("https://vibrant-minds.org/login/", "_blank")}>Join</Button>),

];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});



export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, updateRows] = React.useState([]);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(function effectFunction() {
    async function fetchUpcomingEvents() {
      const response = await fetch("http://localhost/api/getUpcomingEvent", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ player_email: "bdong@ualberta.ca"  })
      });
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (result && result.message) || response.status;
        return Promise.reject(error);
      }
        const result = await response.json();
        const newRows = [];
        if( (response.status == 200) && (result.upcoming.length > 0) ){
          //for loop method
          console.log("this is the response of bdong", result.invitations);
          for (var row of result.upcoming){
            var now = moment();
            if (moment(row.start_time).isAfter(now)){
              var gamedate = moment.utc(row.start_time).format('YYYY-MM-DD');
              var game_start_time = moment.utc(row.start_time).format('hh:mm a');
              var title = "Vibraint Minds Together" ;
              var description = row.player + "will play with me at Vibraint Minds Together";
              var startTime = moment(row.start_time).calendar();
              var endTime = moment(row.start_time).add(2, 'hours').calendar();
              var location = "Will be an link to our website later" ;
              var event = CreateCalendarEvent(title, description, startTime, endTime, location)
              newRows.push(
                createData(
                  row.player, 
                  gamedate, 
                  game_start_time, 
                  <ICalendarLink event={event}>Calendar.ics</ICalendarLink>, 
                  <Button variant="contained" color="primary" onClick={()=> window.open("https://vibrant-minds.org/login/", "_blank")}>Join</Button>
                  ));
            }
            
          }
        }
        updateRows(newRows);
      }
      fetchUpcomingEvents();
  }, []);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
