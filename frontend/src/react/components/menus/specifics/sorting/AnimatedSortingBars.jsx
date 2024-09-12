import React, {useState} from "react";
import { useSprings, animated } from "@react-spring/web";

const AnimatedSortingBars = (props) => {
    /*const animation = useSprings({
        height: isOpen ? bounds.height : 0,
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden'
    }); */

    return (
        <div className="bars-container">
            <div className="bar" style={{backgroundColor: 'red', height: '80%'}}/>
            <div className="bar" style={{backgroundColor: 'blue', height: '100%'}}/>
            <div className="bar" style={{backgroundColor: 'green', height: '60%'}}/>
        </div>
    );
}
export default AnimatedSortingBars;