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
import moment from 'moment';

const columns = [
  { id: 'inviter', label: 'Inviter', minWidth: 170 },
  { id: 'gamedate', label: 'Game date', minWidth: 100 },
  {
    id: 'game_start_time',
    label: 'Game start time',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'accept',
    label: 'Accept',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'decline',
    label: 'Decline',
    minWidth: 170,
    align: 'right',
    // format: (value) => value.toFixed(2),
  },
];

function createData(inviter, gamedate, game_start_time, accept, decline) {
  // const density = game_start_time / size;
  return { inviter, gamedate, game_start_time, accept, decline };
}

const rows = [
  createData('Alpha', '2020-01-23', 8,<Button variant="contained" color="primary">Accept</Button>, <Button variant="contained" color="primary">Decline</Button>),
  createData('Bdong', '2020-05-26', 8, <Button variant="contained" color="primary">Accept</Button>, <Button variant="contained" color="primary">Decline</Button>),
  createData('Zoe', '2020-06-01', 8, <Button variant="contained" color="primary">Accept</Button>, <Button variant="contained" color="primary">Decline</Button>),
  createData('Zuhao', '2020-06-01', 8, <Button variant="contained" color="primary">Accept</Button>, <Button variant="contained" color="primary">Decline</Button>),
  createData('Zijian', '2020-06-01', 8, <Button variant="contained" color="primary">Accept</Button>, <Button variant="contained" color="primary">Decline</Button>),
  createData('Zihao', '2020-06-01', 8, <Button variant="contained" color="primary">Accept</Button>, <Button variant="contained" color="primary">Decline</Button>),

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
  const [rows, updateRows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




  React.useEffect(function effectFunction() {

    async function sentNotification(inviter, invitee, clicked_status, id){
      if (clicked_status == "ACCEPTED"){
        var player_content = invitee + " accepted your invitation";
      }else if (clicked_status == "DECLINED"){
        var player_content = invitee + " is bussy";
      }
      const response = await fetch("http://localhost/api/sendNotification", {
        method: "POST",
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: inviter, invitation_id: id, content: player_content})
        }).then(async response => {
          const data = await response.json();
          console.log('sendNotification body',JSON.stringify({ username: inviter, invitation_id: id, content: player_content}));
          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }
    
      }).catch(error => {
          console.error('There was an error!', error);
      });
     
    }

    async function changeInvitationStatus(inviter, invitee, clicked_status, invitation_id){
      const response = await fetch("http://localhost/api/changeInvitationStatus", {
        method: "POST",
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: invitation_id, status: clicked_status})
        }).then(async response => {
          const data = await response.json();
          console.log('this is the changeInvitationState json', JSON.stringify({ id: invitation_id, status: clicked_status}));
          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }

          await new Promise((resolve, reject) => setTimeout(resolve, 1000));
          sentNotification(inviter, invitee, clicked_status, invitation_id);
          console.log('successful');
          
  
    
      }).catch(error => {
          console.error('There was an error!', error);
      });
     
    }

    async function fetchInvitationReceived() {
      const response = await fetch("http://localhost/api/getInvitationReceived", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ invitee_email: "bdong@ualberta.ca"  })
      });
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (result && result.message) || response.status;
        return Promise.reject(error);
      }
        const result = await response.json();
        const newRows = [];
        if( (response.status == 200) && (result.invitations.length >0)){
          //for loop method
          console.log("this is the response of bdong", result.invitations);
          for (var row of result.invitations){
            if (row.state == "PENDING"){
              var gamedate = moment.utc(row.start_time).format('YYYY-MM-DD').toString();
              var game_start_time = moment.utc(row.start_time).format('hh:mm a').toString();
              // var start_time = moment.utc(row.start_time).format("YYYY-MM-DD hh:mm:ss").toString();
              newRows.push(
                createData(
                  row.inviter, 
                  gamedate, 
                  game_start_time, 
                  <Button variant="contained" color="primary" onClick={()=> {changeInvitationStatus(row.inviter, row.invitee, "ACCEPTED", row.id)}}>Accept</Button>, 
                  <Button variant="contained" color="primary" onClick={()=> {changeInvitationStatus(row.inviter, row.invitee, "DECLINED", row.id)}}>Decline</Button>)
                  );

            }
            
          }
        }
        updateRows(newRows);
      }
      fetchInvitationReceived();
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
