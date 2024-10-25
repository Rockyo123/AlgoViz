import React from "react";
import FontAwesomeBtn from "../../../components/basics/FontAwesomeBtn";
import { faFill, faPen, faPencilRuler, faTrash } from '@fortawesome/free-solid-svg-icons';

const EditToolSelector = (props) => {

    return (
        <div className="space-around-row">
            <FontAwesomeBtn
                icon={faPen}
                active={props.editTool === 'free'}
                onClick={() => props.setEditTool('free')}
                disabled={props.disabled}
            />
            <FontAwesomeBtn
                icon={faPencilRuler}
                active={props.editTool === 'line'}
                onClick={() => props.setEditTool('line')}
                disabled={props.disabled}
            />
            <FontAwesomeBtn
                icon={faFill}
                active={props.editTool === 'bucket'}
                onClick={() => props.setEditTool('bucket')}
                disabled={props.disabled}
            />
            <FontAwesomeBtn
                icon={faTrash}
                onClick={() => props.clearGraph()}
                disabled={props.disabled}
            />
        </div>
    );


}

export default EditToolSelector;