import React, {useState, useEffect} from 'react';
import { withStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import './Slider.css';

const StylishSlider = withStyles({
  root: {
    color: '#032238',
    padding: '15px 0',
    width: "60vw !important",
    margin: '2vw',
  
  },
  thumb: {
    height: '3vh !important',
    width: '3vh !important',
    backgroundColor: '#e77d19',
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
    height: "1vh !important",
  },
  rail: {
    height: "1vh !important",
    opacity: 1,
    backgroundColor: '#3880ff',
  },

})(Slider);

const StylishInput = withStyles({

  root: {
    width: '50%',
    color: 'white',
    fontColor: 'white',
    height: '6vh',  
    fontSize: '10vw',

  },
})(Input);


function InputSlider({min, max, units, step, handleGuessChange}) {
  const [value, setValue] = useState(min);

  useEffect(() =>{
    setValue(min);
    handleGuessChange(min);

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
    </div>    
  );
}
export default InputSlider;