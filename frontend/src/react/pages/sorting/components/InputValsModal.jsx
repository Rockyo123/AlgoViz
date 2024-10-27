import React, {useEffect, useState} from "react";
import CustomModal from "../../../components/elements/modals/CustomModal";

const InputValsModal = (props) => {
    const [curValue, setCurValue] = useState(props.graphVals.join(', '));
    const [error, setError] = useState('');
    //-------------------------------//
    useEffect(() => {
        setCurValue(props.graphVals.join(', '))        
    }, [props.graphVals])

    //-------------------------------//
    const updateCurValue = (newVal) => {
        const regex = /^[0-9, ]+$/;
        if (!regex.test(newVal) && newVal.trim() !== ''){
            return;
        }
        setError('');
        setCurValue(newVal);
    }
    
    //-------------------------------//
    const confirmChanges = () => {
        const newGraphVals = curValue
            .split(',', 1000)
            .filter(value => value.trim() !== '')
            .map(value => {
                const num = Number(value.trim());
                return num > props.MaxGraphVal ? props.MaxGraphVal : num;
            });

        if (newGraphVals.length < 10){
            setError('Array must be at least 10 values.');
            return;
        }
        props.updateGraphVals(newGraphVals)
        props.setIsOpen(false);
    }

    //-------------------------------//
    const body = (
    <div className="array-editor-wrapper">
    <textarea 
        className="array-editor"
        value={curValue}
        onChange={event => updateCurValue(event.target.value)}
    />
    {error && 
    <span className="error-message">
        {error}
    </span>}
    </div>
    
    );

    //-------------------------------//
    return (
        <CustomModal
            isOpen={props.isOpen}
            setIsOpen={props.setIsOpen}
            title={'Edit Array Values'}
            body={body}
            confirmFunction={confirmChanges}
        />
    );
}

export default InputValsModal;