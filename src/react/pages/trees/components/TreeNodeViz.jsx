import React from "react";

//  needs to: 
//      - vizualize itself and children
//      - change value
//      - be able to remove
const TreeNodeViz = ({ node, level, gridXPos, handleClick }) => {
   console.log('rocky debug: rerendering tree node')
    return (
        <div className="tree-node" onClick={() =>handleClick(level, gridXPos)} key={node.id}>
            {node.val}
        </div>
    )
}

export default TreeNodeViz;