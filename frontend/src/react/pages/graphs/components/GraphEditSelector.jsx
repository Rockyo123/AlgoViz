import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFill, faPen, faPencilRuler, faPenToSquare, faClose, faTrash } from '@fortawesome/free-solid-svg-icons';

const GraphEditSelector = ({editMode, setEditMode, editTool, setEditTool, clearGraph}) => {
        
    return (
        <>
        {(!editMode) &&
            <button className="primary-btn" onClick={() => setEditMode(true)}>
            Edit Graph
            </button>
        }
        {(editMode) &&
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', width: '33%'}}>
                <button className="secondary-btn" onClick={() => setEditTool('free')} style={{width: '29%'}}>
                    <FontAwesomeIcon icon={faPen} style={{color: editTool === 'free' ? "#ffffff": "black"}} />   
                </button>
                <button className="secondary-btn" onClick={() => setEditTool('line')} style={{width: '29%'}}>
                    <FontAwesomeIcon icon={faPencilRuler} style={{color: editTool === 'line' ? "#ffffff": "black"}} />   
                </button>
                <button className="secondary-btn" onClick={() => setEditTool('bucket')} style={{width: '29%'}}>
                    <FontAwesomeIcon icon={faFill} style={{color: editTool === 'bucket' ? "#ffffff": "black"}} />   
                </button>
                <button className="secondary-btn" onClick={() => clearGraph()} style={{width: '29%'}}>
                    <FontAwesomeIcon icon={faTrash} style={{color: "black"}} />   
                </button>
            </div>
            {/** IMPORT CUSTOM GRAPH */}
            <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', width: '33%'}}>
                <button className="secondary-btn">
                    <FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffffff"}} />   
                </button>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', width: '33%'}}>
                <button className="secondary-btn" onClick={() => setEditMode(false)}>
                    <FontAwesomeIcon icon={faClose} style={{color: "#ffffff"}} />   
                </button>
            </div>

        </div>
        }
        </>
    )
}

export default GraphEditSelector
