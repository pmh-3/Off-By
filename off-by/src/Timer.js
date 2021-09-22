import React, {useState, useRef, useEffect} from 'react';

function Timer({timesUp}) {
    const [seconds, setSeconds] = React.useState(3000);

    React.useEffect(() => {
        if (seconds >0){
            setTimeout(() =>setSeconds(seconds-1), 1000);
        } else if(seconds == 0) {     
            setSeconds('Times Up!');
            timesUp();
        }

    });

    return (
        <div>
            {seconds}
        </div>
    )
}

export default Timer;