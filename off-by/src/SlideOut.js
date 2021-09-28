import React, { Component } from "react";
import "./SlideOut.css";
import LeaderBoard from './LeaderBoard';
import Stats from './Stats';
 
class SlideOut extends Component {
    render() {
        var visibility = "hide";
     
        if (this.props.isVis) {
          visibility = "show";
        }
     
        return (

          <div id="flyoutMenu"
               onMouseDown={this.props.handleSlide} 
               className={visibility}>

                <LeaderBoard  score = {1000}/>
                <div id="stats">
                <div id="stats-title">Stats</div>
                < Stats id="stats" />
      </div>
          </div>
        );
    }
}
 
export default SlideOut;