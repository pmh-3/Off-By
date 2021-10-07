import React, {useState, useRef, useEffect} from 'react';
import { withStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';
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
    height: '0px !important',
    width: '0px !important',
    backgroundColor: '#e77d19',
    color: '#e77d19',
    border: 'brown',
    marginLeft: 0,
  },

  track: {
    backgroundColor: '#004677',
    color: 'white',
    height: "14px !important",
  },
  rail: {
    height: "14px !important",
    opacity: 1,
    backgroundColor: '#162936',
    color: 'white',

  },
  })(Slider);

function RuleSlider({min, max, guess, answer, step}) {
  const [value, setValue] = useState(min);

  useEffect( ()=>{
    setValue(guess);
  }, [])

  var marks = [
    {
      value: parseInt(guess),

    },
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
                    fontSize: '2vw',        
                    padding: 1,
                    width: '6vw',
                    height: '2vw',
                    backgroundColor: '#162936',
                    borderRadius: '40px',
                    margin: '-2vh',
                    border: '.1vw solid #60473b',
                    left: '-2vw !important'
                    
                  },
                  '& .MuiSlider-mark': {
                    backgroundColor: '#F4762D',
                    height: '6vh',
                    width: 10,
                    top: '30px',
                    borderRadius: '40px',
                    border: '.1vw solid #60473b',

                  },
                  '& .MuiSlider-markLabel': {
                    lineHeight: '1',
                    fontSize: '1.5vw',        
                    padding: 0,
                    color: 'whitesmoke',
                    fontSize: '2vw',      
                    padding: 1,
                    marginTop:'3vh',
                    width: '15vw',
                    height: '2vw',
                    backgroundColor: '#162936',
                    borderRadius: '40px',
                    border: '.1vw solid #60473b',

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