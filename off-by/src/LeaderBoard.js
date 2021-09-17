import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Slider from './InputSlider';
import Answer from './Answer';
import Timer from './Timer';
import { integerPropType } from '@mui/utils';
import { Water } from '@mui/icons-material';
var abs = require('math-abs' );

function LeaderBoard() {

    const [LB, setLB] = useState([  
                                    {   
                                        name: "Waffler",
                                        score: 0,                
                                    },
                                    {
                                        name: "Skeeter",
                                        score: 1,
                                    }
                                    ]);
    const [leader, setLeader] = useState([]);

    const checkLeader = (score) =>{
        LB.filter(l => (l.score < score))
        .map(l => setQuestion(q.question));	

    }


}