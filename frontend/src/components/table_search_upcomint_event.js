
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import ICalendarLink from "react-icalendar-link";
import {Close, Search, ArrowDownward, Clear, Check, SaveAlt,FilterList, FirstPage, LastPage, ChevronRight, ChevronLeft, Remove} from '@material-ui/icons';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import '../css/table_search_upcoming_event.css';

const columns = [
  { 
    field: 'player', 
    title: 'Player', 
    width: 170,
    align: 'center',
    searchable: true,
    sorting: true 
  },
  { 
    field: 'gamedate', 
    title: 'Game date', 
    width: 100,
    align: 'center',
    searchable: true,
    sorting: true
  },
  {
    field: 'game_start_time',
    title: 'Game start time',
    width: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
    searchable: true,
    sorting: true
  },
  {
    field: 'download_calendar',
    title: 'Download Calendar',
    width: 170,
    align: 'center',
    searchable: false,
    sorting: false
    // format: (value) => value.toLocaleString('en-US'),
  },

];
// This resolves to nothing and doesn't affect browser history
const dudUrl = 'javascript:;';

function createData(data_player, data_gamedate, data_game_start_time, data_download_calendar, data_join_meeting) {
  // const density = game_start_time / size;
  return { 
    player: data_player, 
    gamedate: data_gamedate, 
    game_start_time: data_game_start_time, 
    download_calendar: data_download_calendar, 
    join_meeting: data_join_meeting 
  };
}
  
// This is a function return events, may use later
function CreateCalendarEvent(title, description, startTime, endTime, location) {
  return { title, description, startTime, endTime, location };
}

const rows = [];

const join_button = createMuiTheme({
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
            // console.log("this is the response of bdong", result.upcoming);
            for (var row of result.upcoming){
                var moment = require('moment-timezone');
                // moment.tz.setDefault("America/Boise");
                var now = moment();
              if (moment(row.start_time).isAfter(now)){
                  // var date = moment(row.start_time).utcOffset(12).format('YYYY-MM-DD');
                  // var time = moment(row.start_time).utcOffset(12).format('hh:mm a');
                // var gamedate = moment(row.start_time).format('YYYY-MM-DD');
                //   var game_start_time = moment(row.start_time).utcOffset(0).format('hh:mm a');
                  var gamedate = moment(row.start_time).add(7, 'hour').format('YYYY-MM-DD');
                  var game_start_time = moment(row.start_time).add(7, 'hour').format('hh:mm a');
                var title = "Vibraint Minds Together" ;
                var description = row.player + " will play with me at Vibraint Minds Together";
                  var startTime = moment(row.start_time).add(7, 'hour').format();
                  // var startTime = moment(row.start_time).add(1, 'day').utcOffset(5).format();
                  var endTime = moment(row.start_time).add(9, 'hour').format();
                // var endTime = moment(row.start_time).format('YYYY-MM-DD, hh:mm a');
                var location = "Will be an link to our website later" ;
                var event = CreateCalendarEvent(title, description, startTime, endTime, location);
                // var url = "https://[2605:fd00:4:1001:f816:3eff:fef1:58d0]/webrtc?srcId="+ y_username + row.id + "&targetId=" + row.player + row.id + "&roomName=VibrantMindsTogether" + row.id; 
                // console.log("url", url);
                newRows.push(
                  createData(
                    row.player, 
                    gamedate, 
                    game_start_time, 
                    <ICalendarLink event={event}>Calendar.ics</ICalendarLink>, 
                    // <Button variant="contained" color="primary" onClick={()=> window.open(url, "_blank")}>Join</Button>
                    ));
              }
              
            }
          }
          updateRows(newRows);
        }
        fetchUpcomingEvents();
    }, []);


    return (
      <MaterialTable
        title="Upcoming Events"
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
        actionsCellStyle: {alignItems: 'center'}
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
              icon: 'save',
              tooltip: 'Save User',
              onClick: (event, rowData)=> window.open("https://[2605:fd00:4:1001:f816:3eff:fef1:58d0]/webrtc?srcId="+ y_username + rowData.id + "&targetId=" + rowData.player + rowData.id + "&roomName=VibrantMindsTogether" + rowData.id, "_blank")
            }
          ]}
          components={{
            Action: props => (
                <ThemeProvider theme={join_button}>
              <Button
                  className="join_button"
              variant="contained"
              onClick={(event) => props.action.onClick(event, props.data)}
              >
              Join
              </Button>
                    </ThemeProvider>
            )
          }}
      />
    )
  }
  