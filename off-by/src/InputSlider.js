import React, {useState, useRef, useEffect} from 'react';
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
    height: 5,
    padding: '15px 0',
    width: 500,
    margin: 50,
  
  },
  thumb: {
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    border: 'brown',
    marginLeft: 0,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },

  track: {
    height: 5,
    backgroundColor: '#3880ff',
    color: '#3880ff',
  },
  rail: {
    height: 6,
    opacity: 1,
    backgroundColor: '#3880ff',
  },

})(Slider);

const StylishInput = withStyles({

  root: {
    width: 200,
    color: 'white',
    fontColor: 'white',
    height: 60,  
    fontSize: '100px',

    /* //cant get up and down button to look cool
    '& input[type=number]::-webkit-outer-spin-button': {
      height: 30,
      width: 100,
      borderRadius: 0,
      paddingLeft: 10,
      '-webkit-appearance': 'none',
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    color: 'white',
  }
  */
  },
})(Input);


function InputSlider({min, max, units, step, handleGuessChange}) {
  const [value, setValue] = React.useState(min);

  useEffect(() =>{
    setValue(min)

  },[min])

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
    <div className= 'mySlider'>

      <Grid container spacing={0} alignItems="center">
        <h3> {min} </h3>
        <Grid item>
          <StylishSlider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            min={parseInt(min)}
            max={parseInt(max)}
            step= {step}
          />
        </Grid>
        <h3>{max}</h3>
      </Grid>
        <div className= 'guessIn'>
          <StylishInput         
                value={value}
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: step,
                  min: parseInt(min),
                  max: parseInt(max),
                  type: 'number',
                }}
              />
              <div> {units}</div>     
        </div>
    </div>
  );
}
export default InputSlider;