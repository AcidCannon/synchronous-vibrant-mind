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
import {BrowserRouter as Router, Route, Link as Link2} from 'react-router-dom';

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

const rows = [
  createData('Alpha', '2020-01-23', 8,<Link href={dudUrl}>Calendar.ics</Link>, <Button variant="contained" color="primary" component={Link2} to='/home/mainscreen'>Join</Button>),
  createData('Bdong', '2020-05-26', 8, <Link href={dudUrl}>Calendar.ics</Link>, <Button variant="contained" color="primary" component={Link2} to='/home/mainscreen'>Join</Button>),
  createData('Zoe', '2020-06-01', 8, <Link href={dudUrl}>Calendar.ics</Link>, <Button variant="contained" color="primary" component={Link2} to='/home/mainscreen'>Join</Button>),
  createData('Zuhao', '2020-06-01', 8, <Link href={dudUrl}>Calendar.ics</Link>, <Button variant="contained" color="primary" component={Link2} to='/home/mainscreen'>Join</Button>),
  createData('Zijian', '2020-06-01', 8, <Link href={dudUrl}>Calendar.ics</Link>, <Button variant="contained" color="primary" component={Link2} to='/home/mainscreen'>Join</Button>),
  createData('Zihao', '2020-06-01', 8, <Link href={dudUrl}>Calendar.ics</Link>, <Button variant="contained" color="primary" component={Link2} to='/home/mainscreen'>Join</Button>),

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
