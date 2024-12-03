import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { ClampedBlurInput } from "@/components/selectors";
//  needs to: 
//      - vizualize itself and children
//      - change value
//      - be able to remove
const TreeNodeViz = ({ node, level, gridXPos, handleNodeUpdateVal, handleNodeRemove }) => {
    
    const [focused, setFocused] = useState(false);
    const [nodeVal, setNodeVal] = useState(node.val);


    const removeNode = () => {
        if (focused){
            handleNodeRemove(level, gridXPos);
        }
    }

    const updateNodeVal = (newVal) => {
        setNodeVal(newVal);
    }

    const confirmChanges = () => {
        handleNodeUpdateVal(nodeVal, level, gridXPos);
        setFocused(false);
    }

    return (
        <div 
            className={`tree-node ${focused ? 'focused': ''}`} 
            tabIndex={0}
            aria-label={`tree node ${node.val}`}
            onMouseEnter={() => setFocused(true)}
            onMouseLeave={() =>  confirmChanges()}
            onFocus={() => setFocused(true)}
            onBlur={() => confirmChanges()}
            onKeyDown={(e) => {
                //if backspace or delete then remove
                if (e.key  === "Backspace" || e.key  === "Delete"){
                    removeNode();
                }
                if (e.key === 'Enter'){
                    confirmChanges();
                }
                e.stopPropagation();
            }}

            key={node.id}
        >
            {focused && 
                <>
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
                <input 
                    className=""
                    type="number"
                    value={nodeVal}
                    min={-100}
                    max={100}
                    style={{'height': '50%', 'width': '90%'}}
                    onChange={(e) => updateNodeVal(e.target.value)}
                />
                </>
            }

            {(!focused) && 
            <>
                {nodeVal}
            </>
            }
        </div>
    )
}

export default TreeNodeViz;