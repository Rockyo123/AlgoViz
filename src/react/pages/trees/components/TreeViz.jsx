import TreeNodePositionWrapper from "./TreeNodePositionWrapper";
import TreeNodeViz from "./TreeNodeViz";
import AddNewTreeNode from "./AddNewTreeNode";
const Tree = ({ tree, treeHeight, gridSize }) => {

    const addTreeNode = (level, pos) => {
        
        console.log('rocky debug: level, pos: ', level, pos)
        /*
        const parentPos = Math.floor(pos / (level + 1));
        const leftNode = Math.round(pos / (level + 1)) === parentPos;
        console.log('rocky debug: parentPos: ', parentPos, leftNode)
        */
    }

    const treeGridDimensions = [Math.pow(2, treeHeight+1) + 1, treeHeight]
    const gridSquareSize = [gridSize.width / treeGridDimensions[0], gridSize.height / treeGridDimensions[1]]
        
    const offset = [
        gridSize?.left || 0,
        gridSize?.top || 0
    ];

    const buildTreeNodeViz = (nodes, node, level, gridXPos) => {
        const childXDistance = Math.floor(Math.floor((treeGridDimensions[0]-2) / 2) / (2 * (level + 1)));
        if (!node) {
            nodes.push(
                <TreeNodePositionWrapper
                    level={level} 
                    offset={offset}
                    gridXPos={gridXPos}
                    gridSquareSize={gridSquareSize} 
                >
                    <AddNewTreeNode 
                        level={level}
                        gridXPos={gridXPos}
                        addTreeNode={addTreeNode}
                    />
                </TreeNodePositionWrapper>
            ); 
            return;
        }
        nodes.push(
            <TreeNodePositionWrapper
                node={node} 
                level={level} 
                treeGridDimensions={treeGridDimensions} 
                offset={offset}
                gridXPos={gridXPos}
                gridSquareSize={gridSquareSize} 
            >
                <TreeNodeViz 
                    node={node}
                />
            </TreeNodePositionWrapper>
        ); 
        buildTreeNodeViz(nodes, node.left, level+1, gridXPos-childXDistance)
        buildTreeNodeViz(nodes, node.right, level+1, gridXPos+childXDistance)
    
    }

    const TreeViz = [];
    buildTreeNodeViz(TreeViz, tree, 0, Math.floor(treeGridDimensions[0] / 2));
    return (
        <>
            {TreeViz}
        </>
    );
}

export default Tree;