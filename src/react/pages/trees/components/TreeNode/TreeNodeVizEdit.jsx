import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

//  needs to: 
//      - vizualize itself and children
//      - change value
//      - be able to remove
const TreeNodeVizEdit = ({ node, level, levelPos, handleNodeUpdateVal, handleNodeRemove }) => {
    
    const [focused, setFocused] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [nodeVal, setNodeVal] = useState(node.val);
    const inputRef = useRef(null);

    useEffect(() => {
        setNodeVal(node.val);
    }, [node.val])

    useEffect(() => {
        if (editMode){
            inputRef.current.focus();
        }
    }, [editMode]);

    const removeNode = () => {
        if (focused && !editMode){
            handleNodeRemove(level, levelPos);
        }
    }

    const updateNodeVal = (newVal) => {
        setNodeVal(newVal);
    }

    const handleNodeClick = () => {
        if(!editMode){
            setEditMode(true);
        }
        else{
            confirmChanges();
        }
    }
    
    const confirmChanges = () => {
        handleNodeUpdateVal(nodeVal, level, levelPos);
        setFocused(false);
        setEditMode(false);
    }

    const handleRemoveFocus = (e) => {
        if (editMode){
            e.preventDefault();
            inputRef.current.focus();
        }
        else{
            setFocused(false);
        }
    }
   
    return (
        <div 
            className={`tree-node ${focused ? 'focused': ''}`} 
            tabIndex={0}
            aria-label={`tree node ${node.val}`}

            onMouseEnter={() => setFocused(true)}
            onMouseLeave={(e) =>  handleRemoveFocus(e)}
            
            onFocus={() => setFocused(true)}
            onBlur={(e) => handleRemoveFocus(e)}
            
            onClick={() => handleNodeClick()}
            onKeyDown={(e) => {
                //if backspace or delete then remove
                if (e.key  === "Backspace" || e.key  === "Delete"){
                    removeNode();
                }
                if (e.key === 'Enter'){
                    handleNodeClick();
                }
                e.stopPropagation();
            }}

        >
            {focused && 
                <span 
                    className="node-remove-icon"
                    aria-label={`remove tree node ${node.val}`}
                    onClick={(e) => {
                        removeNode()
                        e.stopPropagation();    
                    }
                    }
                >
                    <FontAwesomeIcon 
                        icon={faCircleMinus}
                    />
                </span>
            }
            <input 
                ref={inputRef}
                hidden={!editMode}
                className=""
                type="number"
                value={nodeVal}
                min={-100}
                max={100}
                style={{'height': '50%', 'width': '90%'}}
                onChange={(e) => updateNodeVal(e.target.value)}
            />
            
            {(!editMode) && 
            <>
                {nodeVal}
            </>
            }
        </div>
    )
}

export default TreeNodeVizEdit;