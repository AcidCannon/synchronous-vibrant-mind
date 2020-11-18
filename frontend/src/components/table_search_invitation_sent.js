
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
import MaterialTable from 'material-table';
import {Close, Search, ArrowDownward, Clear, Check, SaveAlt,FilterList, FirstPage, LastPage, ChevronRight, ChevronLeft, Remove} from '@material-ui/icons';

const columns = [
    { field: 'id', title: 'ID', width: 10 , align: 'center', searchable: true},
    { field: 'invitee', title: 'Invitee', width: 150, align: 'center' , searchable: true},
    { field: 'gamedate', title: 'Game date', width: 170, align: 'center', searchable: true},
    {
      field: 'game_start_time',
      title: 'Game start time',
      width: 170,
      align: 'center',
      searchable: true,
      format: (value) => value.toLocaleString('en-US')
    },
    {
      field: 'invitation_state',
      title: 'Invitation State',
      sorting: false,
      width: 150,
      align: 'center',
      searchable: true
    }
  ];
  

const rows = [];

function createData(data_id, data_invitee, data_gamedate, data_game_start_time, data_invitation_state) {
    // const density = game_start_time / size;
    return { id: data_id, invitee: data_invitee, gamedate: data_gamedate, game_start_time: data_game_start_time, invitation_state: data_invitation_state };
  }

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
        async function fetchInvitationSent() {
          const response = await fetch("http://localhost/api/getInvitationSent", {
            method: "POST",
            headers: { 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inviter_email: y_email  })
          });
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (result && result.message) || response.status;
            return Promise.reject(error);
          }
            const result = await response.json();
            const newRows = [];
            if( (response.status == 200) && (result.invitations) ){
              //for loop method
              console.log("this is the response of bdong", result.invitations);
              for (var row of result.invitations){
                  var moment = require('moment-timezone');
                  // moment.tz.setDefault("America/Boise");
                  // var date = moment.utc(row.start_time).format('YYYY-MM-DD');
                  // var time = moment.utc(row.start_time).format('hh:mm a');
                  var date = moment(row.start_time).add(7, 'hour').format('YYYY-MM-DD');
                  var time = moment(row.start_time).add(7, 'hour').format('hh:mm a');
                  newRows.push(createData(row.id, row.invitee, date.toString(), time.toString(), row.state));
              }
            }
            updateRows(newRows);
          }
          fetchInvitationSent();
      }, []);

    return (
      <MaterialTable
        title="Invitation Sent"
        columns={columns}
        data={rows}        
        onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
        options={{
          search: true,
          sorting: true,
          rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
          })
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
      />
    )
  }
  