import React from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";



const StylishSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
    width: 500,
  
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: 'brown',
    marginLeft: 0,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },

  track: {
    height: 2,
    backgroundColor: '#3880ff',
    color: '#3880ff',
  },
  rail: {
    height: 2,
    opacity: 1,
    backgroundColor: '#3880ff',
  },

})(Slider);

const StylishInput = withStyles({

  root: {

    width: 150,
    Color: 'white',
    fontColor: 'white',
    height: 30,  
    fontSize: '30px'
  },

})(Input);


function InputSlider({min, max, handleGuessChange}) {

  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    handleGuessChange(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    handleGuessChange(event.target.value)
  };

  const handleBlur = () => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };


  return (
    <div className= 'slider'>
      <Grid container  container
      direction="column"
      justifyContent="center"
      alignItems="center">
      <Grid container spacing={0} alignItems="center">
        <h3> {min} </h3>
        <Grid item>
          <StylishSlider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            min={parseInt(min)}
            max={parseInt(max)}
          />
        </Grid>
        <h3>{max}</h3>
      </Grid>
          <Grid item >
            <StylishInput         
              value={value}
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: parseInt(min),
                max: parseInt(max),
                type: 'number',
              }}
            />
          </Grid>
          
        </Grid>       
    </div>
  );
}

export default InputSlider;