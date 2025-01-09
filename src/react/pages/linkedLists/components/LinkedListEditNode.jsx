import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

const LinkedListEditNode = ({node, idx, height, width, includeAddNode=false, addNode, removeNode, updateNodeVal}) => {

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

    const removeNodeHandler = () => {
        if (focused && !editMode){
            removeNode(idx);
        }
    }

    const updateNodeValHandler = (newVal) => {
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
        updateNodeVal(idx, nodeVal);
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
    <>
        <div 
            className="linked-list-node-val"
            tabIndex={0}
            aria-label={`linked list node ${node.val}`}

            onMouseEnter={() => setFocused(true)}
            onMouseLeave={(e) =>  handleRemoveFocus(e)}
            
            onFocus={() => setFocused(true)}
            onBlur={(e) => handleRemoveFocus(e)}

            onClick={() => handleNodeClick()}
            onKeyDown={(e) => {
                //if backspace or delete then remove
                if (e.key  === "Backspace" || e.key  === "Delete"){
                    removeNodeHandler();
                }
                if (e.key === 'Enter'){
                    handleNodeClick();
                }
                e.stopPropagation();
            }}
        >
            {focused && 
                <span 
                    className="node-remove-icon right"
                    aria-label={`remove tree node ${nodeVal}`}
                    onClick={(e) => {
                        removeNodeHandler()
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
            style={{'height': '90%', 'width': '90%'}}
            onChange={(e) => updateNodeValHandler(e.target.value)}
        />
            
        {(!editMode) && 
        <>
            {nodeVal}
        </>
        }
        </div>

        {/**add new node btn */}
        {(includeAddNode) && 
        <div 
            className="add-new-list-node" 
            style={{position: 'absolute', height: Math.max(30, height / 2), width: Math.max(30, height / 2), top: (height / 2) - (Math.max(30, height / 2)/2), left: width + 10}}
            tabIndex={0}
            onClick={() => addNode(idx)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    addNode(idx);
                }
            }}
            key={`add-new-list-node-${idx+1}`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        </div>
        }
    </>
    )
}

export default LinkedListEditNode;