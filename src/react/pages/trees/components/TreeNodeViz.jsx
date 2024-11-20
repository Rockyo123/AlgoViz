import React from "react";

//  needs to: 
//      - vizualize itself and children
//      - change value
//      - be able to remove
const TreeNodeViz = ({ node }) => {
   
    return (
        <div className="tree-node">
            {node.val}
        </div>
    )
}

export default TreeNodeViz;