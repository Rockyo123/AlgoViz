import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFill, faPen, faPencilRuler, faPenToSquare, faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import SizeSelector2D from "../../../components/selectors/SizeSelector2D";
import { MAX_GRAPH_SIZE } from "../../../constants";
import EditToolSelector from "./EditToolSelector";

const GraphEditToolSelector = ({disabled, editTool, setEditTool, graphSize, setGraphSize, clearGraph}) => {
        
    return (
        <div className="centered-row">
            <div className="space-between-row" style={{paddingBottom: '10px', width: '90%'}}>
                <div className='flex-hide-on-mobile text-white' style={{width: '25%'}}> 
                    <SizeSelector2D 
                        xSize={graphSize['x']}
                        ySize={graphSize['y']}
                        min={2}
                        max={MAX_GRAPH_SIZE}
                        updateXSize={val => setGraphSize(val, graphSize['y'])}
                        updateYSize={val => setGraphSize(graphSize['x'], val)}
                    />               
                </div>
                <div style={{width: '50%', paddingLeft: '20px', paddingRight: '20px'}}>
                    <EditToolSelector 
                        editTool={editTool}
                        setEditTool={setEditTool}
                        clearGraph={clearGraph}
                        disabled={disabled}
                    />
                </div>
                <div className="justify-end-row" style={{width: '25%'}}>
                    <button className="secondary-btn">
                        <FontAwesomeIcon icon={faPenToSquare} />   
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GraphEditToolSelector;
