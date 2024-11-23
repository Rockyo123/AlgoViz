import React from "react";
import { motion } from "framer-motion";
/**
 * Tree Node Wrapper handles the positioning of the actual tree node. It also handles displaying children nodes
 * @param {*} param0 
 * @returns 
 */
const TreeNodePositionWrapper = ({ level, offset, gridXPos, gridSquareSize, children }) => {
    //  find pixel position of tree node
    const treeNodeLeft = (offset[0] || 0) + gridXPos * gridSquareSize[0];
    const treeNodeTop = (offset[1] || 0) + Math.floor(gridSquareSize[1] * level);

    const circleSize = Math.max(Math.min(gridSquareSize[0], gridSquareSize[1]), 50)
    return (
        <motion.div 
            className="tree-node-wrapper"
            layout
            style={{
                position: 'absolute',
                left: `${treeNodeLeft}px`,
                top: `${treeNodeTop}px`,
                width: `${circleSize}px`,
                height: `${circleSize}px`,
            }}
            key={`tree-node-wrapper-${treeNodeLeft}-${treeNodeTop}`}
        >
            {children}
        </motion.div>
    )
}

export default TreeNodePositionWrapper;