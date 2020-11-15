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
    { label: 'lily@ualberta.ca' },
];

function createData(email) {
    return { label: email };
  }

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

function getSuggestions(value, suggestions) {
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

export default function IntegrationAutosuggest(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        single: '',
        popper: '',
    });

    const [stateSuggestions, setSuggestions] = React.useState([]);
    
    const [suggestions, updateSuggestions] = React.useState([]);

    React.useEffect(function effectFunction() {
        async function fetchSuggestions() {
          const response = await fetch("http://localhost/api/getAllPlayer", {
            method: "GET",
            headers: { 
              'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ inviter_email: y_email  })
          });


          const result = await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (result && result.message) || response.status;
            return Promise.reject(error);
          }
            
            const newSuggestions = [];
            if( (response.status == 200) && (result) ){
              //for loop method
              console.log("this is the response of bdong", result);
              for (var row of result){
                // var username = row.username;
                var player_email = row.email
                newSuggestions.push(createData(player_email));
              }
            }
            updateSuggestions(newSuggestions);
          }
          fetchSuggestions();
      }, []);

    const handleSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value, suggestions));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = name => (event, { newValue }) => {
        props.newPlayerCallback(newValue)
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

    return (
        <div className={classes.root}>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    id: 'react-autosuggest-simple',
                    label: 'Player',
                    placeholder: 'Search a player by email',
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
