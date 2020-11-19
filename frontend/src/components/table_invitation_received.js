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

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Comfortaa',
      'cursive',
    ].join(','),
  },});

const columns = [
  { id: 'inviter', label: 'Inviter', minWidth: 170},
  { id: 'gamedate', label: 'Game date', minWidth: 100 },
  {
    id: 'game_start_time',
    label: 'Game start time',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },

  {
    id: 'accept',
    label: 'Accept',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'decline',
    label: 'Decline',
    minWidth: 170,
    align: 'right'
  },
];

function createData(inviter, invitee, id, gamedate, game_start_time) {
  return { inviter, invitee, id, gamedate, game_start_time };
}

const rows = [];

function refreshPage() {
  window.location.reload(false);
}

async function addMeeting(id){
  const response = await fetch("http://[2605:fd00:4:1001:f816:3eff:feb2:3536]/api/addMeeting", {
    method: "POST",
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ invitation_id: id})
    }).then(async response => {
      const data = await response.json();
      // console.log('sendNotification body',JSON.stringify({ username: inviter, invitation_id: id, content: player_content}));
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

async function sentNotification(inviter, invitee, clicked_status, id){
  if (clicked_status == "ACCEPTED"){
    var player_content = invitee + " accepted your invitation";
  }else if (clicked_status == "DECLINED"){
    var player_content = invitee + " is bussy";
  }
  const response = await fetch("http://[2605:fd00:4:1001:f816:3eff:feb2:3536]/api/sendNotification", {
    method: "POST",
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: inviter, invitation_id: id, content: player_content})
    }).then(async response => {
      const data = await response.json();
      // console.log('sendNotification body',JSON.stringify({ username: inviter, invitation_id: id, content: player_content}));
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

async function changeInvitationStatus(inviter, invitee, clicked_status, id){
  const response = await fetch("http://[2605:fd00:4:1001:f816:3eff:feb2:3536]/api/changeInvitationStatus", {
    method: "POST",
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ invitation_id: id, status: clicked_status})
    }).then(async response => {
      const data = await response.json();
      // console.log('this is the changeInvitationState json', JSON.stringify({ invitation_id: id, status: clicked_status}));
      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
      }

      // await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      sentNotification(inviter, invitee, clicked_status, id);
      if (clicked_status == "ACCEPTED"){
        addMeeting(id);
      }
      
      // console.log('successful', response.status);
      refreshPage() 

  }).catch(error => {
      console.error('There was an error!', error);
  });
 
}


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
    async function fetchInvitationReceived() {
      const response = await fetch("http://[2605:fd00:4:1001:f816:3eff:feb2:3536]/api/getInvitationReceived", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ invitee_email: y_email })
      });
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (result && result.message) || response.status;
        return Promise.reject(error);
      }
        const result = await response.json();
        const newRows = [];
        if( (response.status == 200) && (result.invitations)){
          //for loop method
          // console.log("this is the response of bdong", result.invitations);
          for (var row of result.invitations){ 
            var now = moment();
            if (row.state == "PENDING" && (moment.utc(row.start_time).isAfter(now)) ){
              var gamedate = moment.utc(row.start_time).format('YYYY-MM-DD').toString();
              var game_start_time = moment.utc(row.start_time).format('hh:mm a').toString();
              // var start_time = moment.utc(row.start_time).format("YYYY-MM-DD hh:mm:ss").toString();
              newRows.push(
                createData(
                  row.inviter, 
                  row.invitee,
                  row.id,
                  gamedate, 
                  game_start_time
                  )
                  );

                // console.log("this is the newRows", newRows);

            }
          }
          // console.log("this is the newRows", newRows);
        }
        updateRows(newRows);
      }
      fetchInvitationReceived();
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
              // console.log("row id:", row);
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    switch (column.id) {
                      case "accept":   
                      return (
                      <TableCell key={column.id} align={column.align}>
                        <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={()=> {changeInvitationStatus(row.inviter, row.invitee, "ACCEPTED", row.id)}} 
                        >
                          Accept
                        </Button>
                        </TableCell>);break;
                      case "decline": 
                      return (
                      <TableCell key={column.id}  align={column.align}>
                        <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={()=> {changeInvitationStatus(row.inviter, row.invitee, "DECLINED", row.id)}}
                        >
                          Decline
                        </Button>
                        </TableCell>);break;
                      default:      
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell> 
                      );break;
                    }
                    
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
