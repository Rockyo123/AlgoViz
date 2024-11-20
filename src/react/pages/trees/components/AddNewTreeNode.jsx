import React from "react";

//  needs to: 
//      - vizualize itself and children
//      - change value
//      - be able to remove
const AddNewTreeNode = ({ level, gridXPos, addTreeNode }) => {
   
    const handleAddTreeNode = () => {    
        addTreeNode(level, gridXPos);
   }

    return (
        <div className="add-new-tree-node" 
            tabIndex={0}
            onClick={handleAddTreeNode}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleAddTreeNode();
                }
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        </div>
    )
}

export default AddNewTreeNode;