import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
/**
 * Tree Node Wrapper handles the positioning of the actual tree node. It also handles displaying children nodes
 * @param {*} param0 
 * @returns 
 */
const TreeNodePositionWrapper = ({ level, gridXPos, gridSquareSize, animate, children }) => {
   
    const [layoutStyle, setLayoutStyle] = useState({
        left: gridXPos * gridSquareSize[0],
        top: Math.floor(gridSquareSize[1] * level),
        width: Math.max(Math.min(gridSquareSize[0], gridSquareSize[1]), 30),
        height: Math.max(Math.min(gridSquareSize[0], gridSquareSize[1]), 30),
      });

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
        <>
        {animate && <motion.div 
            className="tree-node-wrapper"
            animate={
                layoutStyle
            }
            initial={{ 'left': layoutStyle['left'], 'top': layoutStyle['top'] - 10, 'height': 10, 'width': layoutStyle['width']}}
            style={{
                position: 'absolute',
            }}
        >
            {children}
        </motion.div>
        }
        
        {(!animate) && 
            <div
                className="tree-node-wrapper"
                style={{
                    position: 'absolute',
                    ...layoutStyle
                }}
            >
                {children}
            </div>
        }
        </>
    )
}

export default TreeNodePositionWrapper;