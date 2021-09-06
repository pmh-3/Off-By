import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";


const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },

});

function InputSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < props.min) {
      setValue(props.min);
    } else if (value > props.max) {
      setValue(props.max);
    }
  };


  return (
    <div className={classes.root}>

      <Grid container spacing={2}   container
      direction="column"
      justifyContent="center"
      alignItems="center">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={props.min}
            max={props.max}
          />
        </Grid>
      </Grid>
          <Grid item >
            <Input
              className={classes.input}
              value={value}
              margin="dense"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: props.min,
                max:props.max,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
          
        </Grid>       
    </div>
  );
}

export default InputSlider;