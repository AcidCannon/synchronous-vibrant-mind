
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
import MaterialTable from 'material-table';
import {Close, Search, ArrowDownward, Clear, Check, SaveAlt,FilterList, FirstPage, LastPage, ChevronRight, ChevronLeft, Remove} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '../css/table_search_invitation_received.css';


// const columns = [
//     { field: 'id', title: 'ID', width: 100 , align: 'center', searchable: true},
//     { field: 'invitee', title: 'Invitee', width: 150, align: 'center' , searchable: true},
//     { field: 'gamedate', title: 'Game date', width: 170, align: 'center', searchable: true},
//     {
//       field: 'game_start_time',
//       title: 'Game start time',
//       width: 170,
//       align: 'center',
//       searchable: true,
//       format: (value) => value.toLocaleString('en-US')
//     },
//     {
//       field: 'invitation_state',
//       title: 'Invitation State',
//       sorting: false,
//       width: 150,
//       align: 'center',
//       searchable: true
//     }
//   ];
  
  const columns = [
    { field: 'id', title: 'ID', width: 100 , align: 'center', searchable: true},
    { field: 'inviter', title: 'Inviter', align: 'center', width: 170, searchable: true},
    { field: 'gamedate', title: 'Game date', align: 'center', width: 100, searchable: true },
    {
      field: 'game_start_time',
      title: 'Game start time',
      width: 170,
      align: 'center',
      searchable: true,
      format: (value) => value.toLocaleString('en-US')
    },
  
  ];

const rows = [];

function refreshPage() {
  window.location.reload(false);
}

function createData(data_id, data_inviter, data_invitee, data_gamedate, data_game_start_time) {
  return {id: data_id, inviter: data_inviter, invitee: data_invitee, gamedate: data_gamedate, game_start_time: data_game_start_time };
}

async function addMeeting(id){
  const response = await fetch("http://localhost/api/addMeeting", {
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
  const response = await fetch("http://localhost/api/sendNotification", {
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
  const response = await fetch("http://localhost/api/changeInvitationStatus", {
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
      await sentNotification(inviter, invitee, clicked_status, id);
      if (clicked_status == "ACCEPTED"){
        await addMeeting(id);
      }
      
      // console.log('successful', response.status);
      // refreshPage() 
      // setTimeout(refreshPage(), 100000);
      setTimeout(refreshPage(), 80000);
      

  }).catch(error => {
      console.error('There was an error!', error);
  });
 
}

const button = createMuiTheme({
    typography: {
        button: {
            fontSize: '1rem',
            textTransform: 'none',
            fontFamily: [
                'Comfortaa',
                'cursive',
            ].join(','),
        },
    },});



export default function BasicSearch() {
    const username = document.cookie.match('(^|;) ?' + "User name" + '=([^;]*)(;|$)');
    const x_username = unescape(username[2]);
    const y_username = x_username.slice(9,-2);
    const email = document.cookie.match('(^|;) ?' + "email" + '=([^;]*)(;|$)');
    const x_email = unescape(email[2]);
    const y_email = x_email.slice(10,-2);

    const { useState } = React;
    const [selectedRow, setSelectedRow] = useState(null);
    const [rows, updateRows] = React.useState([]);


    React.useEffect(function effectFunction() {
      async function fetchInvitationReceived() {
        const response = await fetch("http://localhost/api/getInvitationReceived", {
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
                var moment = require('moment-timezone');
                if (row.state == "PENDING"){
                var gamedate = moment.utc(row.start_time).format('YYYY-MM-DD').toString();
                var game_start_time = moment.utc(row.start_time).format('hh:mm a').toString();
                // var start_time = moment.utc(row.start_time).format("YYYY-MM-DD hh:mm:ss").toString();
                newRows.push(
                  createData(
                    row.id,
                    row.inviter, 
                    row.invitee,
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
      <MaterialTable
        title="Invitations Received"
        columns={columns}
        data={rows}        
        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
        options={{
          search: true,
          sorting: true,
          rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
          }),
          actionsColumnIndex: -1,
        //   actionsCellStyle: {display: 'flex',
        //   justifyContent: 'center',
        //   padding: '24px',
        //   width: '100%',
        //   marginBottom: '-1px'
        // }

        }}
        icons={{ 
            Check: Check,
            DetailPanel: ChevronRight,
            Export: SaveAlt,
            Filter: FilterList,
            FirstPage: FirstPage,
            LastPage: LastPage,
            NextPage: ChevronRight,
            PreviousPage: ChevronLeft,
            Search: Search,
            Clear: Clear,
            ThirdStateCheck: Remove,
            SortArrow: ArrowDownward,
            ResetSearch: Close
          }}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Index',
              onClick: (event, rowData) => {changeInvitationStatus(rowData.inviter, rowData.invitee, "ACCEPTED", rowData.id)}
            },
            {
              icon: 'save',
              tooltip: 'Save User',
              onClick: (event, rowData)=> {changeInvitationStatus(rowData.inviter, rowData.invitee, "DECLINED", rowData.id)}
            }
          ]}
          components={{
            Action: props => {
                if (props.action.icon === 'edit'){
                  return(
                      <ThemeProvider theme={button}>
                    <Button
                        className="accept_button"
                        variant="contained"
                        onClick={(event)=> props.action.onClick(event, props.data)}
                    >
                    Accept
                    </Button>
                      </ThemeProvider>
                    )
                }
                if(props.action.icon === 'save'){
                  return(
                      <ThemeProvider theme={button}>
                      <Button
                          className="decline_button"
                          onClick={(event) => props.action.onClick(event, props.data)}
                          variant="contained"
                      >
                      Decline
                      </Button>
                      </ThemeProvider>
                  )
              }
            }
          }}
      />
    )
  }
  