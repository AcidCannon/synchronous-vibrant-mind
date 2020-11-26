
import * as React from 'react';
// import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
import MaterialTable from 'material-table';
import {Close, Search, ArrowDownward, Clear, Check, SaveAlt,FilterList, FirstPage, LastPage, ChevronRight, ChevronLeft, Remove} from '@material-ui/icons';

// const host = "localhost";
const host = "[2605:fd00:4:1001:f816:3eff:feb2:3536]";

  const columns = [
    { 
      field: 'player', 
      title: 'Player', 
      width: 170,
      searchable: true,
      sorting: true
    },
    { 
      field: 'gamedate', 
      title: 'Game date', 
      width: 100,
      searchable: true,
      sorting: true
    },
    {
      field: 'game_start_time',
      title: 'Game start time',
      width: 170,
      align: 'center',
      searchable: true,
      sorting: true,
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      field: 'player_login',
      title: 'Player Login',
      width: 170,
      searchable: true,
      sorting: true,
      align: 'center',
    },
    {
      field: 'player_logout',
      title: 'Player Logout',
      width: 170,
      searchable: true,
      sorting: true,
      align: 'center',
    },
    {
      field: 'my_login',
      title: 'My Login',
      width: 170,
      align: 'center',
      searchable: true,
      sorting: true
    },
    {
      field: 'my_logout',
      title: 'My Logout',
      width: 170,
      align: 'center',
      searchable: true,
      sorting: true
    },
    {
      field: 'time_period',
      title: 'Time Period',
      width: 170,
      align: 'center',
      searchable: true,
      sorting: true
    },
  ];
  
  function createData(data_player, data_gamedate, data_game_start_time, data_player_login, data_player_logout, data_my_login, data_my_logout, data_time_period) {
    return { 
      player: data_player, 
      gamedate: data_gamedate, 
      game_start_time: data_game_start_time, 
      player_login: data_player_login, 
      player_logout: data_player_logout, 
      my_login: data_my_login, 
      my_logout: data_my_logout, 
      time_period: data_time_period
    };
  }
  
  const rows = [];

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
      async function fetchHistory() {
        const response = await fetch("http://"+host+"/api/getMeetingHistory?p="+y_email, {
          method: "GET",
          headers: { 
            'Content-Type': 'application/json'
          },
          // body: JSON.stringify({ player_email: y_email  })
        });
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (result && result.message) || response.status;
          return Promise.reject(error);
        }
          const result = await response.json();
          const newRows = [];
          if( (response.status == 200) && (result.history) ){
            //for loop method
            // console.log("this is the response of bdong", result.history);
            for (var row of result.history){
              if ((row.p_login != null) && (row.my_login != null)){
              var date = moment.utc(row.start_time).format('YYYY-MM-DD');
              var time = moment.utc(row.start_time).format('hh:mm a');
              var p_login_time = moment.utc(row.p_login).format('hh:mm a');
              var p_logout_time = moment.utc(row.p_logout).format('hh:mm a');
              var my_login_time = moment.utc(row.my_login).format('hh:mm a');
              var my_logout_time = moment.utc(row.my_logout).format('hh:mm a');
              var start_time = moment.utc(row.start_time);
              if ( moment.utc(row.p_logout).isAfter(row.my_logout)){
                var time_seconds = moment.utc(row.p_logout).diff(moment.utc(start_time));
                var duration = moment.duration(time_seconds);
                var timePiroid = Math.floor(duration.asHours()) + moment.utc(time_seconds).format(":mm:ss");
              }else{
                var time_seconds = moment.utc(row.my_logout).diff(moment.utc(start_time));
                var duration = moment.duration(time_seconds);
                var timePiroid = Math.floor(duration.asHours()) + moment.utc(time_seconds).format(":mm:ss");
              }
              
              newRows.push(createData(row.player, date.toString(), time.toString(), p_login_time.toString(), p_logout_time.toString(), my_login_time.toString(), my_logout_time.toString(),timePiroid.toString()));
            }
            }
          
          }
          updateRows(newRows);
        }
        fetchHistory();
    }, []);

    return (
      <MaterialTable
        title="History"
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
  