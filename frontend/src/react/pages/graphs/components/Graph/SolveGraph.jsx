import React, {useState} from "react"
import GraphSquare from "./GraphSquare"
 

const SolveGraph = (props) => {
    const [graphVals, setGraphVals] = useState(props.arr)

    const graphSquares = graphVals.map((row, rowIndex) => (
        <div key={rowIndex} className="graph-grid-row">
            {row.map((val, colIndex) => (
            <GraphSquare 
                key={colIndex} 
                val={val}
            />
            ))}
    </div>
    ))


    return (
        <div className="graph-grid" 
        >
            {graphSquares}
        </div>
    )
    }

export default SolveGraph;
