import React, {useState, useRef, useEffect} from 'react';
import './Stats.css'


function Stats() {
    
    return(
        <>
        <div className="stats-text">
            <div id="stat">♦ Number of Questions: 100 </div>
            <div id="stat">♦ Number of Plays: 1</div>
            <div id="stat">♦ Categories: World | Science | Sports |          History | Pop Culture | Variety</div>
            <div id="stat">♦ Click HERE to add a Question</div>
            <div id="stat">♦ Created By Peter Heitkemper... AKA Wafler</div>
            <div id="stat">♦ Built using React, Node js, and MySQL</div>
        </div>
        
        </>
    );
}
export default Stats;