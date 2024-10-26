import { useState, useRef } from "react";
import { deepCopyGraphVals } from "../utils/GraphUtils";
import { fetchSquareCoordAtPoint } from '../utils/CoordUtils.js'
import { getSelectedSquares } from "../utils/PaintUtils.js";
/**
 * Custom hook to manage editing of graph values in a grid.
 *
 * This hook provides functionality to start and end editing modes,
 * update the values of squares in a graph, and manage the editing state.
 *
 * @param {Array} graphVals - The current graph values as a 2D array.
 * @param {Function} setGraph - The function to update the graph values.
 * @param {string} editTool - The current editing tool being used (e.g., "brush", "eraser").
 * @param {Array} squareDimensions - The dimensions of each square in the grid, [width, height].
 * @param {Object} graphDimensions - The dimensions of the graph area, including top, left, width, and height.
 * @param {number} graphDimensions.top - The top position of the graph area.
 * @param {number} graphDimensions.left - The left position of the graph area.
 * @param {number} graphDimensions.width - The width of the graph area.
 * @param {number} graphDimensions.height - The height of the graph area.
 *
 * @returns {Object} An object containing the following:
 * @returns {number|null} editMode - The current editing mode (1, 2 for start/goal, -4, or null if not editing).
 * @returns {Function} startEditMode - Function to start editing mode with specified type and click coordinates.
 * @returns {Function} editSquare - Function to edit the square at specified coordinates.
 * @returns {Function} endEditMode - Function to end the editing mode and reset square values.
 */
const useEditGraph = (graphVals, setGraph, editTool, squareDimensions, graphDimensions) => {
    const [editMode, setEditMode] = useState(null);
    const initEditCoords = useRef([0, 0]);
    const graphValsBeforeEdit = useRef(deepCopyGraphVals(graphVals));
    const curEditingSquares = useRef([]);

    const { top, left, width, height } = graphDimensions;

    const updateSquareVals = (val, points) => {
        const newGraphVals = deepCopyGraphVals(graphValsBeforeEdit.current);
        for (let [x, y] of points) {
            const oldVal = graphValsBeforeEdit.current[x][y];
            if ((val === 4 && oldVal === -1) || (val === -4 && oldVal === 0)) {
                newGraphVals[x][y] = val;
            } else if (val === 1 || val === 2) {
                // Don't allow placing start over goal or vice versa
                if ((val === 1 && oldVal === 2) || (val === 2 && oldVal === 1)) {
                    newGraphVals = graphVals;
                } else {
                    newGraphVals[x][y] = val;
                }
            }
        }
        setGraph(newGraphVals);
    };

    const startEditMode = (type, clickX, clickY) => {
        let editType = null;

        const trueX = clickX - left;
        const trueY = clickY - top;
        const squareCoord = fetchSquareCoordAtPoint(trueX, trueY, squareDimensions[0], squareDimensions[1], width, height);
        graphValsBeforeEdit.current = deepCopyGraphVals(graphVals);
        initEditCoords.current = squareCoord;

        const squareValue = graphVals[squareCoord[0]][squareCoord[1]];
        const isStartOrGoal = squareValue === 1 || squareValue === 2;

        if (isStartOrGoal) {
            setEditMode(squareValue);
            graphValsBeforeEdit.current[squareCoord[0]][squareCoord[1]] = 0;
        } else {
            if (type === 0) {
                editType = -4;
            }
            if (type === 2) {
                editType = 4;
            }
            setEditMode(editType);
            editSquare(editType, clickX, clickY);
        }
    };

    const editSquare = (editType, clickX, clickY) => {
        if (!editType) return;
        const trueX = clickX - left;
        const trueY = clickY - top;
        const squareCoord = fetchSquareCoordAtPoint(trueX, trueY, squareDimensions[0], squareDimensions[1], width, height);
        let selectedSquares = [];
        if (editType === 1 || editType === 2) {
            selectedSquares = [squareCoord];
            curEditingSquares.current = selectedSquares;
        } else {
            selectedSquares = getSelectedSquares(curEditingSquares.current, editTool, initEditCoords.current[0], initEditCoords.current[1], squareCoord[0], squareCoord[1]);
            curEditingSquares.current = selectedSquares;
        }
        updateSquareVals(editType, selectedSquares);
    };

    const endEditMode = () => {
        // From currently edited squares, set new graphVals to -1
        setEditMode(null);
        const newGraphVals = deepCopyGraphVals(graphVals);
        for (let i = 0; i < newGraphVals.length; i++) {
            for (let j = 0; j < newGraphVals[0].length; j++) {
                if (newGraphVals[i][j] === 4) {
                    newGraphVals[i][j] = 0;
                }
                if (newGraphVals[i][j] === -4) {
                    newGraphVals[i][j] = -1;
                }
            }
        }
        setGraph(newGraphVals);
        curEditingSquares.current = [];
    };

    return {
        editMode,
        startEditMode,
        editSquare,
        endEditMode,
    };
};

export default useEditGraph;
