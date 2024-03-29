import React, {useState, useRef, useEffect} from 'react';
import './LeaderBoard.css'

function LeaderBoard({score, setLeader}) {

    const [LB, setLB] = useState([]);

    const refreshLB = ()=>{
        setLB([]);
        return Promise.resolve(0);
    };
    
    useEffect(()=>{
        refreshLB().then((num) => init());
        
    },[])

    useEffect(()=>{
        checkLeader(score);
        
    },[LB])

    const init = ()=>{

            getLB().then(res =>{
                for(let i=0; i<20;i++){
                setLB(l =>[... l,{
                    Name: res.L[i].Name,
                    Score: res.L[i].Score,
                    Rank: i+1
                }])
            }    
         } ).catch(err => console.log(err));
          
    }

    const getLB = async () => {
        const response = await fetch('/getLeaderBoard');
        const body = await response.json();
        //body = JSON.parse(body);
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
    };

    var screen = <></>;

    var scoretobeat;
    const checkLeader = (score) =>{
        if(LB.length<20){
            //wait
        }else{     
    
            LB.filter(l => (l.Rank == 20))
            .map(l => {scoretobeat = l.Score});	

            if(parseInt(scoretobeat) >= parseInt(score)){
                setLeader();
            }
        }
    }

    return(
        <>
        {screen}
        <div className= "leaderboard">
                <div id= 'lb-title'>Leaderboard</div>
                <ul class="no-bullets">
                    <div>0. Waffler: 0%</div>
                    {LB.map((l) => (
                        <li key={l.Rank}>{l.Rank}. {l.Name}: {l.Score}%</li>
                    ))}
                </ul>
        </div>
        </>
    )
}
export default LeaderBoard;