import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
/**
 * Tree Node Wrapper handles the positioning of the actual tree node. It also handles displaying children nodes
 * @param {*} param0 
 * @returns 
 */
const TreeNodePositionWrapper = ({ node, level, gridXPos, gridSquareSize, children }) => {
   
    const [layoutStyle, setLayoutStyle] = useState({
        left: gridXPos * gridSquareSize[0],
        top: Math.floor(gridSquareSize[1] * level),
        width: Math.max(Math.min(gridSquareSize[0], gridSquareSize[1]), 30),
        height: Math.max(Math.min(gridSquareSize[0], gridSquareSize[1]), 30),
      });
    //console.log('rocky debug: node, lev, gridXPos: ', node?.val, level, gridXPos)
    // Recalculate position and size when props change
    useEffect(() => {
        let left = gridXPos * gridSquareSize[0];
        if (gridSquareSize[0] < 30) {
            left -= (30 - gridSquareSize[0]) / 2;
        }

        setLayoutStyle({
            left,
            top: Math.floor(gridSquareSize[1] * level),
            width: Math.max(Math.min(gridSquareSize[0], gridSquareSize[1]), 30),
            height: Math.max(Math.min(gridSquareSize[0], gridSquareSize[1]), 30),
        });
    }, [level, gridXPos, gridSquareSize]);

    return (
        <motion.div 
            className="tree-node-wrapper"
            animate={
                layoutStyle
            }
            style={{
                position: 'absolute',
            }}
            //={`tree-node-wrapper-${treeNodeLeft}-${treeNodeTop}`}
        >
            {children}
        </motion.div>
    )
}

export default TreeNodePositionWrapper;