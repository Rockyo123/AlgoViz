import TreeNodePositionWrapper from "./TreeNode/TreeNodePositionWrapper";
import TreeNodeViz from "./TreeNode/TreeNodeViz";
import AddNewTreeNode from "./TreeNode/AddNewTreeNode";
import useSolveTree from './hooks/useSolveTree';
import { useMemo } from "react";

const Tree = ({ tree, treeHeight, maxTreeHeight, treeChangedFlag, gridSize, updateTree, speed, algorithm, target, vizState, updateVizState, editEnabled=true }) => {

    const trueHeight = Math.min(treeHeight, maxTreeHeight+1)
    const treeGridDimensions = [Math.pow(2, trueHeight)+1, trueHeight]
    const [solvedTree, solvedTreeChangedFlag] = useSolveTree(tree, treeChangedFlag, treeGridDimensions[0], target, vizState, updateVizState, speed, algorithm);

    const addTreeNode = (level, pos) => {        
        // given position in grid, find position in level
        const amtSpaceBetweenNode = Math.floor(treeGridDimensions[0] /  (Math.pow(2, level)));
        const posInLevel = Math.floor(pos / amtSpaceBetweenNode)
        updateTree('add', level, posInLevel, -1);
    }

    const removeTreeNode = (level, pos) => {
        // given position in grid, find position in level
        const amtSpaceBetweenNode = Math.floor(treeGridDimensions[0] /  (Math.pow(2, level)));
        const posInLevel = Math.floor(pos / amtSpaceBetweenNode)
        updateTree('remove', level, posInLevel, -1);
    }

    const updateNodeVal = (val, level, pos) => {
        // given position in grid, find position in level
        const amtSpaceBetweenNode = Math.floor(treeGridDimensions[0] /  (Math.pow(2, level)));
        const posInLevel = Math.floor(pos / amtSpaceBetweenNode)
        updateTree('updateVal', level, posInLevel, val);
    }

    
    //--- UPDATE TREE WHENEVER TREE NODE ADDED
    const TreeViz = useMemo(() => {
        const ret = []
        const gridSquareSize = [gridSize.width / treeGridDimensions[0], gridSize.height / treeGridDimensions[1]]
            
        const buildTreeNodeViz = (nodes, node, level, gridXPos, childXDistance) => {
            if (level > maxTreeHeight) return;
            if (!node) {
                if (vizState === 'NotStarted'){
                    nodes.push(
                        <TreeNodePositionWrapper
                            level={level} 
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
                }
                return;
            } 
            nodes.push(
                <TreeNodePositionWrapper
                    node={node} 
                    level={level} 
                    gridXPos={gridXPos}
                    gridSquareSize={gridSquareSize} 
                >
                    <TreeNodeViz 
                        node={node}
                        level={level}
                        gridXPos={gridXPos}
                        editEnabled={vizState === 'NotStarted' && editEnabled}
                        handleNodeUpdateVal={updateNodeVal}
                        handleNodeRemove={removeTreeNode}
                    />
                </TreeNodePositionWrapper>
            ); 
            buildTreeNodeViz(nodes, node.left, level+1, gridXPos-childXDistance, Math.floor(childXDistance / 2))
            buildTreeNodeViz(nodes, node.right, level+1, gridXPos+childXDistance, Math.floor(childXDistance / 2))
        }
        const childXDistance = Math.floor(Math.floor((treeGridDimensions[0]) / 2) / 2);
        buildTreeNodeViz(ret, solvedTree, 0, Math.floor(treeGridDimensions[0] / 2), childXDistance);
        return ret;

    }, [solvedTreeChangedFlag, gridSize, vizState])
    
    return (
        <>
        {TreeViz}
        </>
    );
}

export default Tree;