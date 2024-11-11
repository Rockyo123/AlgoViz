import React, { useEffect, useLayoutEffect, useState } from "react"

/**
 * Custom hook that handles an array, ensuring it stays within the bounds of both max vals and max entries.
 * This hook manages the length of the array, clamps its values based on `maxArrVal`, and allows for 
 * randomizing the array values.
 * Probably a bit more complex than it needs to be but personal project so why not have fun ya know?
 *
 * @param {number} maxArrVal - The maximum value allowed for the array entries.
 * @param {number} maxArrEntries - The maximum number of entries allowed in the array.
 *
 * @returns {[Array<number>, Object, Function, Function, Function]} 
 *          Returns an array of the current values, 
 *          Size of current graph
 *          Function to update the array values, 
 *          Function to randomize array values,
 *          Function to update the array length.
 */
export const useResponsiveGraph = (maxXEntries, maxYEntries, defaultXEntries=30, defaultYEntries=30) => {
    
    const [graph, setGraph] = useState([[]]);

    const graphSize = {
        'x': graph.length,
        'y': graph[0].length
    }
    
    // Adjust graph size based on change in max entries
    useLayoutEffect(() => {
        if (!maxXEntries || !maxYEntries) return;
        if (!graphSize['x'] || !graphSize['y']) {
            initializeGraph();
            return;
        }
        if (maxXEntries < graph.length || maxYEntries < graph[0].length){
            updateGraphSize(Math.min(maxXEntries, graph.length), Math.min(maxYEntries, graph[0].length));
        }
    }, [maxXEntries, maxYEntries]);
    
    const initializeGraph = () => {
        if (!maxXEntries || !maxYEntries) return [[]];
        const rows = Math.min(maxXEntries, defaultXEntries);
        const cols = Math.min(maxYEntries, defaultYEntries);

        const newGraph = Array.from({ length: rows }, () => Array(cols).fill(0));
        newGraph[0][0] = 1;
        newGraph[rows-1][cols-1] = 2;
        setGraph(newGraph);    
    }

    //  Updates the values of the graph, ensuring row len or col len does not exceed max entries
    const updateGraphVals = (graphIn) => {
        const rows = Math.min(graphIn.length, maxXEntries); 
        const cols = Math.min(graphIn[0]?.length || 0, maxYEntries);
        const newGraph = Array.from({ length: rows }, (_, i) => {
            if (i < rows) {
                return Array.from({ length: cols }, (_, j) => {
                    return j < cols ? graphIn[i][j] : 0;
                });
            } else {
                return Array(maxYEntries).fill(0);
            }
        });
    
        setGraph(newGraph);
    }

    //  Updates the size of the graph, either truncating or extending it with 0's
    const updateGraphSize = (xIn, yIn) => {
        const newGraph = []
        let startInBounds = false, goalInBounds = false;
        const rows = Math.min(xIn, maxXEntries);
        const cols = Math.min(yIn, maxYEntries)
        for (let i = 0; i < rows; i++){
            const newRow = [];
            for (let j = 0; j < cols; j++){
                if (i < graph.length && j < graph[i].length) {
                    const value = graph[i][j];
                    newRow.push(value);
                    if (value === 1) startInBounds = true;
                    if (value === 2) goalInBounds = true;
                } else {
                    newRow.push(0);
                }
            }
            newGraph.push(newRow);
        }
        if (!startInBounds) newGraph[0][0] = 1;
        if (!goalInBounds) newGraph[xIn-1][yIn-1] = 2;
        setGraph(newGraph);
    }

    return [graph, graphSize, updateGraphSize, updateGraphVals];
}