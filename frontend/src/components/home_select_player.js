import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';


import { AccountCircle, LockRounded } from "@material-ui/icons";
import { InputAdornment } from "@material-ui/core";

const suggestions = [
    { label: 'alpha@hotmail.com' },
    { label: 'bdong@hotmail.com' },
    { label: 'zoe@hotmail.com' },
];

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
            label="Player" 
            margin="normal" 
            variant="outlined"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <AccountCircle/>
                    </InputAdornment>
                    ),
                }}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                    <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
                ))}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

const useStyles = makeStyles(theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
    },
}));

export default function IntegrationAutosuggest() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        single: '',
        popper: '',
    });

    const [stateSuggestions, setSuggestions] = React.useState([]);
    const [suggestions, updateSuggestions] = React.useState([]);

    const handleSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = name => (event, { newValue }) => {
        setState({
            ...state,
            [name]: newValue,
        });
    };

    const autosuggestProps = {
        renderInputComponent,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        // onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
    };

    React.useEffect(function effectFunction() {
        async function fetchSuggestions() {
          const response = await fetch("http://[2605:fd00:4:1001:f816:3eff:fe56:29db]/vibrantminds2/api/participants", {
            method: "GET",
            headers: { 
              'Content-Type': 'application/json',
              'credentials': 'include',
              'Authorization': 'Bearer '+ '639e6000b8f093c6ebb5229bd04053262b2e9389'
            },
            // body: JSON.stringify({ inviter_email: y_email  })
          });
        // async function fetchSuggestions() {
        //     var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        //     var url = "http://[2605:fd00:4:1001:f816:3eff:fe56:29db]/vibrantminds2/api/participants"
        //     var xmlhttp = new XMLHttpRequest();
        //     xmlhttp.open("GET", url);
        //     xmlhttp.send();
        //     xmlhttp.onreadystatechange = (e) => {
        //         console.log(xmlhttp.responseText)
        //     }


          const result = await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (result && result.message) || response.status;
            return Promise.reject(error);
          }
            
            const newSuggestions = [];
            if( (response.status == 200) && (result.length >0) ){
              //for loop method
              console.log("this is the response of bdong", result.invitations);
              for (var row of result){
                // var username = row.username;
                var player_email = row.participant_info.email
                newSuggestions.push({label: player_email});
              }
            }
            updateSuggestions(newSuggestions);
          }
          fetchSuggestions();
      }, []);

    return (
        <div className={classes.root}>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    id: 'react-autosuggest-simple',
                    label: 'Player',
                    placeholder: 'Search a player (start with a)',
                    value: state.single,
                    onChange: handleChange('single'),
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
        </div>
    );
}
