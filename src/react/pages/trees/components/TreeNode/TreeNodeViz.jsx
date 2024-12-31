import React from "react";
import TreeNodeVizEdit from "./TreeNodeVizEdit";
import TreeNodeVizSolve from './TreeNodeVizSolve';
//  needs to: 
//      - vizualize itself and children
//      - change value
//      - be able to remove
const TreeNodeViz = ({ node, level, levelPos, handleNodeUpdateVal, handleNodeRemove, editEnabled }) => {
    return (
        <>
            {(editEnabled) &&
                <TreeNodeVizEdit 
                    node={node}
                    level={level}
                    levelPos={levelPos} 
                    handleNodeUpdateVal={handleNodeUpdateVal} 
                    handleNodeRemove={handleNodeRemove}
                />
            }
            {(!editEnabled) && 
                <TreeNodeVizSolve 
                    node={node}
                />
            }
        </>
    )
}

export default TreeNodeViz