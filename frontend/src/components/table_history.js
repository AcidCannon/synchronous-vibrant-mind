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
import moment from 'moment';

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
    id: 'player_login',
    label: 'Player Login',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'player_logout',
    label: 'Player Logout',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'my_login',
    label: 'My Login',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'my_logout',
    label: 'My Logout',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'time_period',
    label: 'Time Period',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  // {
  //   id: 'invitation_state',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toFixed(2),
  // },
];

function createData(player, gamedate, game_start_time, player_login, player_logout, my_login, my_logout, time_period) {
  // const density = game_start_time / size;
  return { player, gamedate, game_start_time, player_login, player_logout, my_login, my_logout, time_period};
}

const rows = [];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});





export default function StickyHeadTable() {
  const username = document.cookie.match('(^|;) ?' + "User name" + '=([^;]*)(;|$)');
  const x_username = unescape(username[2]);
  const y_username = x_username.slice(9,-2);
  const email = document.cookie.match('(^|;) ?' + "email" + '=([^;]*)(;|$)');
  const x_email = unescape(email[2]);
  const y_email = x_email.slice(10,-2);

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
    async function fetchHistory() {
      const response = await fetch("http://localhost/api/getMeetingHistory", {
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
        if( (response.status == 200) && (result.history.length >0) ){
          //for loop method
          console.log("this is the response of bdong", result.history);
          for (var row of result.history){
            var date = moment.utc(row.start_time).format('YYYY-MM-DD');
            var time = moment.utc(row.start_time).format('hh:mm a');
            var p_login_time = moment.utc(row.p_login).format('hh:mm a');
            var p_logout_time = moment.utc(row.p_logout).format('hh:mm a');
            var my_login_time = moment.utc(row.my_login).format('hh:mm a');
            var my_logout_time = moment.utc(row.my_logout).format('hh:mm a');
            var start_time = moment.utc(row.start_time);
            if ( moment.utc(row.p_logout).isAfter(row.my_logout)){
              var time_seconds = Math.abs(start_time.diff(moment.utc(row.p_logout), "seconds", true));
              var duration = moment.duration(time_seconds, "seconds");
              var timePiroid = moment.utc(duration.asMilliseconds()).format("hh:mm")
            }else{
              var time_seconds = Math.abs(start_time.diff(moment.utc(row.my_logout), "seconds", true));
              var duration = moment.duration(time_seconds, "seconds");
              var timePiroid = moment.utc(duration.asMilliseconds()).format("h:mm")
            }
            newRows.push(createData(row.player, date.toString(), time.toString(), p_login_time.toString(), p_logout_time.toString(), my_login_time.toString(), my_logout_time.toString(),timePiroid.toString()));
          }
        }
        updateRows(newRows);
      }
      fetchHistory();
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
