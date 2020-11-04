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
  {
    id: 'content',
    label: 'Content',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'time',
    label: 'Time',
    minWidth: 170,
    align: 'left',
    // format: (value) => value.toLocaleString('en-US'),
  },

];

function createData(content, time) {
  // const density = game_start_time / size;
  return {content, time};
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
    async function fetchNotification() {
      const response = await fetch("http://localhost/api/getNotification", {
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
        if( (response.status == 200) && (result.notifications.length >0) ){
          //for loop method
          console.log("this is the response of bdong", result.notifications);
          for (var row of result.notifications){
            var sent_time = moment.utc(row.time).format('YYYY-MM-DD, hh:mm a').toString();
            newRows.push(createData(row.content, sent_time));
          }
        }
        updateRows(newRows);
      }
      fetchNotification();
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
