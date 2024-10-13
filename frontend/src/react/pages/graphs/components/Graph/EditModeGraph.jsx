import React, {useState, useRef } from "react"
import GraphSquare from "./GraphSquare";
import { fetchSquareCoordAtPoint } from '../../utils/CoordUtils.js'
import { getSelectedSquares } from "../../utils/PaintUtils.js";
import { deepCopyGraphVals } from '../../utils/GraphUtils.js'
/**
 * 
 * 
 */
const EditModeGraph = (props) => {
    const [editMode, setEditMode] = useState(null);
    const initEditCoords = useRef([0, 0]);
    const graphValsBeforeEdit = useRef([...props.graphVals]);
    const curEditingSquares = useRef([]);

    const {top, left, width, height} = props.graphDimensions;

    
    const updateSquareVals = (val, points)=> {
        const newGraphVals = deepCopyGraphVals(graphValsBeforeEdit.current);
        for (let point of points){
            let x = point[0];
            let y = point[1];
            const oldVal = graphValsBeforeEdit.current[x][y] 
            if (
                (val === 4  && oldVal === -1) || 
                (val === -4 && oldVal === 0)  ||
                (val === 1  && oldVal !== 2)  ||
                (val === 2  && oldVal !== 1)      
            ){
                newGraphVals[x][y] = val;
            }     
        }  
        props.setGraphVals(newGraphVals);
    }

    const startEditMode = (type, clickX, clickY) => {
        let editType = null;
        
        const trueX = clickX - left;
        const trueY = clickY - top;
        const squareCoord = fetchSquareCoordAtPoint(trueX, trueY, props.squareDimensions[0], props.squareDimensions[1], width, height)
        graphValsBeforeEdit.current = deepCopyGraphVals(props.graphVals);
        initEditCoords.current = squareCoord;

        const squareValue = props.graphVals[squareCoord[0]][squareCoord[1]];
        const isStartOrGoal = squareValue === 1 || squareValue === 2;

        if (isStartOrGoal){
            setEditMode(squareValue);
            graphValsBeforeEdit.current[squareCoord[0]][squareCoord[1]] = 0
        }
        else {
            if(type === 0){
                editType = -4
            }
            if (type === 2){
                editType = 4
            }
            setEditMode(editType);
            editSquare(editType, clickX, clickY);
        }
    }


    const editSquare = (editType, clickX, clickY) => {
        if (!editType) return;
        const trueX = clickX - left;
        const trueY = clickY - top;
        const squareCoord = fetchSquareCoordAtPoint(trueX, trueY, props.squareDimensions[0], props.squareDimensions[1], width, height)
        let selectedSquares = [];
        if (editType === 1 || editType === 2){
            selectedSquares = [squareCoord]//getSelectedSquares(curEditingSquares.current, props.editTool, initEditCoords.current[0], initEditCoords.current[1], squareCoord[0], squareCoord[1])
            curEditingSquares.current = selectedSquares;
        }
        else{
            selectedSquares = getSelectedSquares(curEditingSquares.current, props.editTool, initEditCoords.current[0], initEditCoords.current[1], squareCoord[0], squareCoord[1])
            curEditingSquares.current = selectedSquares;
        }
        updateSquareVals(editType, selectedSquares);
    }


    const endEditMode = () => {
        // from currently edited squares, set new graphVals to -1
        setEditMode(null);
        const newGraphVals = deepCopyGraphVals(props.graphVals);
        for (let i = 0; i < newGraphVals.length; i++){
            for (let j = 0; j < newGraphVals[0].length; j++){
                if (newGraphVals[i][j] === 4){
                    newGraphVals[i][j]  = 0;
                }
                if (newGraphVals[i][j]  === -4){
                    newGraphVals[i][j]  = -1;
                }
            }
        }
        props.setGraphVals(newGraphVals)
        curEditingSquares.current = [];
    }

    const graphSquares = props.graphVals.map((row, rowIndex) => (
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
        <div className="graph-grid" 
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => startEditMode(e.button, e.clientX, e.clientY)}
            onMouseMove={(e) => editSquare(editMode, e.clientX, e.clientY)}
            onMouseUp={() => endEditMode()}
            onMouseLeave={() => endEditMode()}
        >
            {graphSquares}
        </div>
    )
}

export default EditModeGraph;
