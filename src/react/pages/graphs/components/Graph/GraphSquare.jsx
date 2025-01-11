import React, {useState} from "react"
/**
 * GraphSquare component that represents a single square in the graph grid.
 * 
 * graph value meanings:
 *  -5: pathfinding finished, not found
 *  -4: being edited, to blocked
 *  -1: blocked
 *   0: blank
 *   1: start
 *   2: goal
 *   3: visited
 *   4: being edited, to blank
 *   5: pathfinding finished, found
 * 
 * @param {number} val - The value representing the state of the square.
 *
 * @returns {JSX.Element} The rendered square component.
 */
const GraphSquare = ({val}) => {
    
    const getSquareStyling = () =>{ 
        let color = 'rgba(255, 255, 255, 1)';
        switch (val){
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
        <div 
            className="graph-grid-square"
            style={getSquareStyling()}
        >
        </div>
    )
}

export default GraphSquare;
