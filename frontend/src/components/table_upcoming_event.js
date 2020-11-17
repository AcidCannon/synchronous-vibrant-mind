import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import ICalendarLink from "react-icalendar-link";


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Comfortaa',
      'cursive',
    ].join(','),
  },});

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

const rows = [];


export default function StickyHeadTable() {
  const username = document.cookie.match('(^|;) ?' + "User name" + '=([^;]*)(;|$)');
  const x_username = unescape(username[2]);
  const y_username = x_username.slice(9,-2);
  const email = document.cookie.match('(^|;) ?' + "email" + '=([^;]*)(;|$)');
  const x_email = unescape(email[2]);
  const y_email = x_email.slice(10,-2);

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
        body: JSON.stringify({ player_email: y_email  })
      });
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (result && result.message) || response.status;
        return Promise.reject(error);
      }
        const result = await response.json();
        const newRows = [];
        if( (response.status == 200) && (result.upcoming) ){
          //for loop method
          console.log("this is the response of bdong", result.upcoming);
          for (var row of result.upcoming){
            var now = moment();
            if (moment.utc(row.start_time).isAfter(now)){
              var gamedate = moment.utc(row.start_time).utcOffset(12).format('YYYY-MM-DD').toString();
              var game_start_time = moment.utc(row.start_time).utcOffset(12).format('hh:mm a').toString();
              var title = "Vibraint Minds Together" ;
              var description = row.player + " will play with me at Vibraint Minds Together";
              var startTime = moment(row.start_time).utcOffset(22).format();
              var endTime = moment(row.start_time).add(2, 'hour').utcOffset(22).format();
              var location = "Will be an link to our website later" ;
              var event = CreateCalendarEvent(title, description, startTime, endTime, location);
              // var url = "https://[2605:fd00:4:1001:f816:3eff:fef1:58d0]/webrtc?srcId="+ y_username + row.id + "&targetId=" + row.player + row.id + "&roomName=VibrantMindsTogether" + row.id; 
              // console.log("url", url);
              var url = "https://vibrant-minds.org/vibrantminds2/start";
              // console.log("row.start_time", row.start_time);
              // console.log("endTime", endTime);
              // console.log("startTime", startTime);
              // console.log("endTime", endTime);
              // console.log("event", event);
              newRows.push(
                createData(
                  row.player, 
                  gamedate, 
                  game_start_time, 
                  <ICalendarLink event={event}>Calendar.ics</ICalendarLink>, 
                  <Button variant="contained" color="primary" onClick={()=> window.open(url, "_blank")}>Join</Button>
                  ));
            }
            
          }
        }
        updateRows(newRows);
      }
      fetchUpcomingEvents();
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <Paper>
          <TableContainer >
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
      </ThemeProvider>
  );
}
