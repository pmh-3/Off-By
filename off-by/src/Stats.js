import React, {useState, useEffect} from 'react';
import './Stats.css'

function Stats() {
    const [plays, setPlays] = useState(100);

        useEffect( ()=>{
            //init();
        },[]);

    const init = ()=>{

        getPlays().then(res =>{
            setPlays(res.plays);
          
     } ).catch(err => console.log(err));    
}

const getPlays = async () => {
    const response = await fetch('/getPlays');
    const body = await response.json();
    //body = JSON.parse(body);
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
};  
    return(
        <>
            <div id="stats-title">Stats</div>     
            <div id="stat">♦ Categories: World | Science | Sports |          History | Pop Culture | Variety</div>
            <div id="stat">♦ Click <a href="https://docs.google.com/spreadsheets/d/1I5yc2laufIp2hwiuwaI777xtSDkFYMAlHJt3XjlG0b0/edit?usp=sharing" onclick="window.open('https://docs.google.com/spreadsheets/d/1I5yc2laufIp2hwiuwaI777xtSDkFYMAlHJt3XjlG0b0/edit?usp=sharing', '_blank')">Here</a> to add a Question</div>
            <div id="stat">♦ Created By Peter Heitkemper (AKA Waffler) </div>
            <div id="stat">♦ Built using React, Node js, MySQL</div>
            <div id="stat">♦ 2,500+ lines of code in Javascript, HTML, CSS</div>
        </>
    );
}
export default Stats;