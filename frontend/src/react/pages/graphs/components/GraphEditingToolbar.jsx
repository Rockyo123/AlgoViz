import React from "react"
import SizeSelector2D from "@/components/selectors/SizeSelector2D";
import { MAX_GRAPH_SIZE } from "@/constants";
import EditToolSelector from "./EditToolSelector";

/**
 * Contains tools for editting the graph. Contains size selector and edit tool selector
 * 
 * @param {String} editTool - Currently selected editTool
 * @param {Function} setEditTool - Function for updating edit tool
 * @param {Function} ClearGraph - Clear all walls from the graph
 * @param {Boolean} disabled - Is selector disabled? Will be disabled while pathfinding algo is running.
 * @param {Object} graphSize - { 'x', 'y' } Number of squares in the graph, ex. { 'x': 10, 'y': 10 } is a 10 x 10 graph.
 * @param {Function} setGraphSize - Function for updating graph size
 * 
 * @returns 
 */
const GraphEditingToolbar  = ({editTool, setEditTool, clearGraph,  disabled, graphSize, setGraphSize}) => {
        
    return (
        <div className="centered-row">
            <div className="space-between-row" style={{paddingBottom: '10px', width: '90%'}}>
                <div className='flex-hide-on-mobile text-white' style={{width: '50%'}}> 
                    <SizeSelector2D 
                        xSize={graphSize['x']}
                        ySize={graphSize['y']}
                        min={2}
                        max={MAX_GRAPH_SIZE}
                        updateXSize={val => setGraphSize(val, graphSize['y'])}
                        updateYSize={val => setGraphSize(graphSize['x'], val)}
                    />               
                </div>
                <div style={{flex: '1 1 100%', paddingLeft: '20px', paddingRight: '20px'}}>
                    <EditToolSelector 
                        editTool={editTool}
                        setEditTool={setEditTool}
                        clearGraph={clearGraph}
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    )
}

export default GraphEditingToolbar;
