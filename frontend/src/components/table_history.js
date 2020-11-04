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


async function getMeetingHistory(){
  const response = await fetch("http://localhost/api/getMeetingHistory", {
              method: "POST",
              headers: { 
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ player_email: "bdong@ualberta.ca"  })
            }).then(async response => {
                const result = await response.json();
                // const rows = [];

                // check for error response
                if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (result && result.message) || response.status;
                  return Promise.reject(error);
                }
                
                
                if( (response.status == 200) && (result.history.length >0) ){
                  //map method
                  // result.history.map( ({id, start_time, player, p_login, p_logout, my_login, my_logout} ) => {
                  //   var date = Moment(start_time).format('YYYY-MM-DD');
                  //   var time = Moment(start_time).format('h:mm');
                  //   var p_login_time = Moment(p_login).format('h:mm');
                  //   var p_logout_time = Moment(p_logout).format('h:mm');
                  //   var my_login_time = Moment(my_login).format('h:mm');
                  //   var my_logout_time = Moment(my_logout).format('h:mm');
                  //   if ( p_logout_time.diff(my_logout_time) ){
                  //     var timePiroid = Moment(start_time).diff(Moment(p_logout),'hours',true);
                  //   }else{
                  //     var timePiroid = Moment(start_time).diff(Moment(my_logout),'hours',true);
                  //   }
                  //   createData(player, date.toString(), time.toString(), p_login_time.toString(), p_logout_time.toString(), my_login_time.toString(), my_logout_time.toString(),timePiroid.toString());
                  // })

                  //for loop method
                  console.log("this is the response of bdong", result.history);
                  for (var row of result.history){
                    var date = moment(row.start_time).format('YYYY-MM-DD');
                    var time = moment(row.start_time).format('h:mm');
                    var p_login_time = moment(row.p_login).format('h:mm');
                    var p_logout_time = moment(row.p_logout).format('h:mm');
                    var my_login_time = moment(row.my_login).format('h:mm');
                    var my_logout_time = moment(row.my_logout).format('h:mm');
                    if ( p_logout_time < my_logout_time ){
                      var num = moment(row.start_time).diff(moment(row.p_logout),'hours',true);
                      var timePiroid = Math.abs(Math.round(num * 100) / 100); 
                    }else{
                      var num = moment(row.start_time).diff(moment(row.my_logout),'hours',true);
                      var timePiroid = Math.abs(Math.round(num * 100) / 100 ) ; 
                    }
                    rows.push(createData(row.player, date.toString(), time.toString(), p_login_time.toString(), p_logout_time.toString(), my_login_time.toString(), my_logout_time.toString(),timePiroid.toString()));
                  }
                }
 
              
                // console.log('this is the temp_rows', temp_rows);
                // const rows = temp_rows.map((row) => row);
                console.log('this is the rows', rows);
                await new Promise((resolve, reject) => setTimeout(resolve, 1000));
                return rows;
                
              
            });  

    }




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
    async function fetchHistory() {
      const response = await fetch("http://localhost/api/getMeetingHistory", {
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
