
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import moment from 'moment';
import MaterialTable from 'material-table';
import {Close, Search, ArrowDownward, Clear, Check, SaveAlt,FilterList, FirstPage, LastPage, ChevronRight, ChevronLeft, Remove} from '@material-ui/icons';


  const columns = [
    {
      field: 'content',
      title: 'Content',
      width: 170,
      align: 'center',
      searchable: true,
      sorting: false
    },
    {
      field: 'time',
      title: 'Time',
      width: 170,
      align: 'center',
      searchable: true,
      sorting: true
    },
  ]
  
  function createData(data_content, data_time) {
    return {content: data_content, time: data_time};
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
          if( (response.status == 200) && (result.notifications) ){
            //for loop method
            // console.log("this is the response of bdong", result.notifications);
            for (var row of result.notifications){
                var moment = require('moment-timezone');
                // moment.tz.setDefault("America/Boise");
                // var date = moment(row.start_time).utcOffset(12).format('YYYY-MM-DD');
                // var time = moment(row.start_time).utcOffset(12).format('hh:mm a');
              var sent_time = moment(row.time).format('YYYY-MM-DD, hh:mm a').toString();
              newRows.push(createData(row.content, sent_time));
            }
          }
          updateRows(newRows);
        }
        fetchNotification();
    }, []);

    return (
      <MaterialTable
        title="Notifications"
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
  