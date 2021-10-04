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
    color: '#004677',
    padding: '15px 0',
    width: "60vw !important",
    margin: 40,
    height: "20px !important",
  
  },
  thumb: {
    height: '50px !important',
    width: '50px !important',
    backgroundColor: '#e77d19',
    color: '#e77d19',
    border: 'brown',
    marginLeft: 0,
  },

  track: {
    backgroundColor: '#004677',
    color: '#3880ff',
    height: "14px !important",
  },
  rail: {
    height: "14px !important",
    opacity: 1,
    backgroundColor: '#3880ff',
  },


  })(Slider);




function RuleSlider({min, max, guess, answer, step}) {
  const [value, setValue] = useState(min);

  useEffect( ()=>{
    setValue(guess);
  }, [])

  var marks = [
    {
      value: parseInt(answer),
      label: 'Answer: ' + String(answer),
    },

  ];


  const handleSliderChange = (event, newValue) => {
  };


  return (
      <div id="ans-slider">   
          <div id="min">
            {min}
          </div>
          <div >
            <StylishSlider
                marks={marks}

              onChange={handleSliderChange}
              min={parseInt(min)}
              max={parseInt(max)}

              value={value}
              valueLabelDisplay="on"
              step= {step}

              sx={{
                width: 300,
                
                '& .MuiSlider-valueLabel': {

                    lineHeight: 1.5,
                    fontSize: '2vw',        
                    padding: 1,
                    width: '6vw',
                    height: '2vw',
                    backgroundColor: '#004677',
                    borderRadius: '10%',
                    margin: '-.5vw',
                    
                  },
                  '& .MuiSlider-mark': {
                    backgroundColor: '#004677',
                    height: 80,
                    width: 10,
                  },
                  '& .MuiSlider-markLabel': {
                    lineHeight: 1,
                    fontSize: '1.5vw',        
                    padding: 0,
                    color: 'whitesmoke',
                    fontSize: '2vw',    
                    backgroundColor: '#004677',    
                    padding: 1,
                    marginTop:'3vh',
                    width: '15vw',
                    height: '2vw',
                    borderRadius: '10% ',
                  },
              }}
            />
            </div>
          <div id="max">
            {max}
          </div>  
      </div>  
  );
}
export default RuleSlider;