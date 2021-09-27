import { orange } from '@mui/material/colors';
import React, {useState, useRef, useEffect} from 'react';
import './Ruler.css';

function Ruler({min, max, guess, answer, offBy}){

    const rulerStyle ={
        backgroundcolor: '#090846',
        width: '2vw',
        height: '100%',
    }
    const rulerBoxStyle ={
        display: 'flex',
        flexdirection: 'row',
    }

    const offByStyle ={
        height: '100%',
        backgroundcolor: 'red',
    }

    return(
        <>
            <hr id='hzline'></hr>
        </>
    )
}

export default Ruler;
