import React, { useState } from "react";
import Xarrow, { useXarrow } from "react-xarrows";
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLinesVertical } from "@fortawesome/free-solid-svg-icons";
import LinkedListEditNode from "./LinkedListEditNode";
import { motion } from "framer-motion";

const LinkedListNode = ({ node, idx, top, left, width, editable, includeAddNode=false, addNode, removeNode, updateNodeVal}) => {
  
  const updateXArrow = useXarrow();
  const height = width / 2
  return (
    <>
    <Draggable handle="#node-handle" onDrag={updateXArrow} onStop={updateXArrow} bounds="parent" onStart={() => (editable) ? true : false}>
      <div
        className={`linked-list-node`}
        style={{top: top, left: left, width: width, height: height, backgroundColor: node.color, zIndex: 1}}
        aria-label={`linked list node ${node.val}`}        
        id={`linked-list-node-${idx}`}
      >
        <div className="linked-list-node-drag-handle" id="node-handle" style={{cursor: (editable) ? 'move' : 'default'}}>
          <FontAwesomeIcon icon={faGripLinesVertical} color="gray"/>
        </div>
        {editable && 
        <LinkedListEditNode 
          node={node}
          idx={idx}
          addNode={addNode}
          includeAddNode={includeAddNode}
          removeNode={removeNode}
          updateNodeVal={updateNodeVal}
          height={height}
          width={width}
        />}
        {(!editable) && 
          <div 
            className="linked-list-node-val"
            aria-label={`linked list node ${node.val}`}
          >
            {node.val}
          </div>
        }
      </div>
    </Draggable>
            {/** arrow from right of previous node to current node */}
            {idx !== 0 && 
              <Xarrow 
                start={`linked-list-node-${idx-1}`}
                startAnchor='right'
                end={`linked-list-node-${idx}`}
                endAnchor='left'
                strokeWidth={3}
                tailSize={1}
                animateDrawing={true}
                color="white"
                zIndex={0}
              />
            }
            </>
  )
}


export default LinkedListNode;