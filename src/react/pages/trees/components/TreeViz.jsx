import TreeNodePositionWrapper from "./TreeNodePositionWrapper";
import TreeNodeViz from "./TreeNodeViz";
import AddNewTreeNode from "./AddNewTreeNode";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

const Tree = ({ tree, treeHeight, treeChangedFlag, gridSize, updateTree }) => {

    const treeGridDimensions = [Math.pow(2, treeHeight)+1, treeHeight]

    const addTreeNode = (level, pos) => {        
        // given position in grid, find position in level
        const amtSpaceBetweenNode = Math.floor(treeGridDimensions[0] /  (Math.pow(2, level)));
        const posInLevel = Math.floor(pos / amtSpaceBetweenNode)
        updateTree('add', level, posInLevel, -1);
    }

    
    //--- UPDATE TREE WHENEVER TREE NODE ADDED
    const TreeViz = useMemo(() => {

        const ret = []
        const gridSquareSize = [gridSize.width / treeGridDimensions[0], gridSize.height / treeGridDimensions[1]]
            
        const offset = [
            gridSize?.left || 0,
            gridSize?.top || 0
        ];
    
        const buildTreeNodeViz = (nodes, node, level, gridXPos, childXDistance) => {
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
                    offset={offset}
                    gridXPos={gridXPos}
                    gridSquareSize={gridSquareSize} 
                >
                    <TreeNodeViz 
                        node={node}
                        level={level}
                        gridXPos={gridXPos}
                        handleClick={addTreeNode}
                    />
                </TreeNodePositionWrapper>
            ); 
            buildTreeNodeViz(nodes, node.left, level+1, gridXPos-childXDistance, Math.floor(childXDistance / 2))
            buildTreeNodeViz(nodes, node.right, level+1, gridXPos+childXDistance, Math.floor(childXDistance / 2))
        }
        const childXDistance = Math.floor(Math.floor((treeGridDimensions[0]) / 2) / 2);
        buildTreeNodeViz(ret, tree, 0, Math.floor(treeGridDimensions[0] / 2), childXDistance);
        console.log('returning tree')
        return ret;

    }, [treeChangedFlag, gridSize])
    
    return (
        <AnimatePresence>
            {TreeViz}
        </AnimatePresence>
    );
}

export default Tree;