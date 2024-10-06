import React, {useState} from "react"

const GraphSquare = (props) => {
    
    const getSquareStyling = () =>{ 
        let color = 'rgba(255, 255, 255, 1)';
        switch (props.val){
            case -2:
            case 2:
                color = 'rgba(100, 100, 100, .01)';
                break;
            case 1:
                color = 'rgba(0, 0, 0, 1)';
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
