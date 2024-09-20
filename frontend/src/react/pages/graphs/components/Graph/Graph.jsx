import React, {useState, useRef, useEffect} from "react"
import GraphSquare from "./GraphSquare";
import { useContainerDimensions } from "../../../../hooks/useContainerDimensions";
import { fetchSquareCoordAtPoint } from '../../utils/CoordUtils.js'
import { getSelectedSquares } from "../../utils/PaintUtils.js";
/**
 * 
 * 
 */
const Graph = (props) => {
    const [editMode, setEditMode] = useState(null);
    const [editTool, setEditTool] = useState('bucket');
    const [initEditCoords, setInitEditCoords] = useState([0, 0]);
    const [graphVals, setGraphVals] = useState(props.arr)

    const containerRef = useRef(null);
    const squareDimensions = props.arr ? [props.arr.length, props.arr[0].length] : [0, 0];
    const {top, left, width, height} = useContainerDimensions(containerRef);


    const updateSquareVal = (val, x, y) => {
        const newGraphVals = [...graphVals];
        const oldVal = newGraphVals[x][y] 
        if (
            (val === 2 && oldVal === 0) || 
            (val === -2 && oldVal === 1)
        ){
            newGraphVals[x][y] = val;
        }        
        console.log('rocky debug: newGraphVals:', newGraphVals[x][y])
        setGraphVals(newGraphVals);
    }

    const startEditMode = (type, clickX, clickY) => {
        let editType = null;
        console.log('rocky debug: type: ', type)
        if(type === 0){
            editType = 2
        }
        if (type === 2){
            editType = -2
        }
        setEditMode(editType);
        const squareCoord = fetchSquareCoordAtPoint(trueX, trueY, squareDimensions[0], squareDimensions[1], width, height)
        setInitEditCoords(squareCoord)
        editSquare(editType, clickX, clickY);
    }


    const editSquare = (editType, clickX, clickY) => {
        if (editType){
            const trueX = clickX - left;
            const trueY = clickY - top;
            const squareCoord = fetchSquareCoordAtPoint(trueX, trueY, squareDimensions[0], squareDimensions[1], width, height)
            
            const selectedSquares = getSelectedSquares(editTool, initEditCoords[0], initEditCoords[1], squareCoord[0], squareCoord[1])
            console.log('rockty debug: selectedSquares: ', selectedSquares)
            //set edit mode true
            //updateSquareVal(editType, squareCoord[0], squareCoord[1]);
        }
    }


    const endEditMode = () => {
        // from currently edited squares, set new graphVals to 1
        setEditMode(null);
        console.log('rocky debug: end edit mode')
        const newGraphVals = [...graphVals];
        for (let i = 0; i < newGraphVals.length; i++){
            for (let j = 0; j < newGraphVals[0].length; j++){
                if (newGraphVals[i][j] === -2){
                    newGraphVals[i][j]  = 0;
                }
                if (newGraphVals[i][j]  === 2){
                    newGraphVals[i][j]  = 1;
                }
            }
        }
        setGraphVals(newGraphVals)
    }

    const graphSquares = graphVals.map((row, rowIndex) => (
        <div key={rowIndex} className="graph-grid-row">
            {row.map((val, colIndex) => (
            <GraphSquare 
                key={colIndex} 
                val={val}
                editState={editMode}
            />
            ))}
      </div>
    ))

    return (
        <div ref={containerRef} className="graph-grid-responsive-container">
            <div className="graph-grid" 
                onContextMenu={(e) => e.preventDefault()}
                onMouseDown={(e) => startEditMode(e.button, e.clientX, e.clientY)}
                onMouseMove={(e) => editSquare(editMode, e.clientX, e.clientY)}
                onMouseUp={() => endEditMode()}
                onMouseLeave={() => endEditMode()}
            >
                {graphSquares}
            </div>
        </div>
    )
}

export default Graph;
