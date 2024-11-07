import React from "react";
import FontAwesomeBtn from "../../../components/elements/layout/FontAwesomeBtn";
import { faFill, faPen, faPencilRuler, faTrash } from '@fortawesome/free-solid-svg-icons';

/**
 * Component that allows for selection of current graph editing tool (free, line, bucket). Also allows for clearing the whole graph.
 *
 * @param {String} editTool - Currently selected editTool
 * @param {Function} setEditTool - The function to update the edit tool
 * @param {Function} ClearGraph - Clear all walls from the graph
 * @param {Boolean} disabled - Is selector disabled? Will be disabled while pathfinding algo is running.
 *
 * @returns {JSX.Element} Selector for graph edit tool
 */
const EditToolSelector = ({editTool, setEditTool, clearGraph, disabled}) => {

    return (
        <div className="space-around-row">
            <FontAwesomeBtn
                icon={faPen}
                active={editTool === 'free'}
                onClick={() => setEditTool('free')}
                disabled={disabled}
            />
            <FontAwesomeBtn
                icon={faPencilRuler}
                active={editTool === 'line'}
                onClick={() => setEditTool('line')}
                disabled={disabled}
            />
            <FontAwesomeBtn
                icon={faFill}
                active={editTool === 'bucket'}
                onClick={() => setEditTool('bucket')}
                disabled={disabled}
            />
            <FontAwesomeBtn
                icon={faTrash}
                onClick={() => clearGraph()}
                disabled={disabled}
            />
        </div>
    );


}

export default EditToolSelector;