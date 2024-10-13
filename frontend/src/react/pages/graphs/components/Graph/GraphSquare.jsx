import React, {useState} from "react"

/**
 * graph value meanings:
 *  -1: blocked
 *   0: blank
 *   1: start
 *   2: goal
 */
const GraphSquare = (props) => {
    
    const getSquareStyling = () =>{ 
        let color = 'rgba(255, 255, 255, 1)';
        switch (props.val){
            case -5:
                color = 'rgba(255, 0, 0, 1)';
                break;
            case -1:
                color = 'rgba(0, 0, 0, 1)';
                break;
            case 1:
                color = 'rgba(0, 0, 255, 1)';
                break;
            case 2:
                color = 'rgba(0, 255, 0, 1)';
                break;
            case 3: 
                color = 'rgba(173, 216, 230, 1)';
                break;
            case 4:
            case -4:
                color = 'rgba(100, 100, 100, .01)';
                break;
            case 5:
                color = 'rgba(255, 215, 0, 1)';
                break;
            default:
                color = 'rgba(255, 255, 255, 1)';
                break
        }
        return {backgroundColor: color} 
    }


    return (
        <div className="graph-grid-square"
            style={getSquareStyling()}
        >
        </div>
    )
}

export default GraphSquare;
