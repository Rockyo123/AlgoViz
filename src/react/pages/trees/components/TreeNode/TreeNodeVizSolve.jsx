const TreeNodeVizSolve = ({ node }) => { 
    const nodeColor = node.color;
    return (
        <div 
            className='tree-node' 
            style={{backgroundColor: nodeColor}}
            aria-label={`tree node ${node.val}`}
        >
            {node.val}
        </div> 
    )
}

export default TreeNodeVizSolve