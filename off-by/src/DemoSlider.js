import React, {useState, useRef, useEffect} from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import './Slider.css';

const StylishSlider = withStyles({
  root: {
    color: '#0f4c81',
    padding: '1px 0',
    width: "10vw !important",
    margin: 20,
    height: "20px !important",
  
  },
  thumb: {
    height: '50px !important',
    width: '50px !important',
    backgroundColor: '#ffff',
    color: '#e77d19',
    border: 'brown',
    marginLeft: 0,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },

  track: {
    backgroundColor: '#3880ff',
    color: '#3880ff',
    height: "14px !important",
  },
  rail: {
    height: "14px !important",
    opacity: 1,
    backgroundColor: '#ffff',
  },

})(Slider);

const StylishInput = withStyles({

  root: {
    width: '15%',
    color: 'white',
    fontColor: 'white',
    height: 110,  
    fontSize: '80px',

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


function DemoSlider({min, max, units, step, handleGuessChange}) {
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
    <div className= 'question-container'>
      <div id="slider-box">
        
          <div id="min">
            {min}
          </div>
          <div >
            <StylishSlider
              value={typeof value === 'number' ? value : 0}
              onChange={handleSliderChange}
              min={parseInt(min)}
              max={parseInt(max)}
              step= {step}
            />
            </div>
          <div id="max">
            {max}
          </div>
        
      </div>
      
      <div id="input-box">
        <StylishInput   
                id= 'input'      
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
        <div id='units'> 
          {units}
        </div> 
      </div>
    </div>    
  );
}
export default DemoSlider;