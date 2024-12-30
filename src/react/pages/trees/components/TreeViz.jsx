import TreeNodePositionWrapper from "./TreeNode/TreeNodePositionWrapper";
import TreeNodeViz from "./TreeNode/TreeNodeViz";
import AddNewTreeNode from "./TreeNode/AddNewTreeNode";
import useSolveTree from './hooks/useSolveTree';
import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";

const Tree = ({ tree, treeArr, treeHeight, maxTreeHeight, treeChangedFlag, gridSize, updateTree, speed, algorithm, target, vizState, updateVizState, editEnabled=true }) => {

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

    const gridSquareSize = [gridSize.width / treeGridDimensions[0], gridSize.height / treeGridDimensions[1]]

    const TreeViz = treeArr.map((node, idx) => {
        if (!node) return <></>;
        const level = node.level;
        const gridXPos = node.gridXPos;
        if (!node.val) {
            if (vizState === 'NotStarted'){
                return (
                    <TreeNodePositionWrapper
                        node={node}
                        level={level} 
                        gridXPos={gridXPos}
                        gridSquareSize={gridSquareSize} 
                        //key={`node-pos-wrapper-${level}-${gridXPos}`}
                    >
                        <AddNewTreeNode 
                            level={level}
                            gridXPos={gridXPos}
                            addTreeNode={addTreeNode}
                        />
                    </TreeNodePositionWrapper>
                ); 
            }
        } 
        return (
            <TreeNodePositionWrapper
                node={node} 
                level={level} 
                gridXPos={gridXPos}
                gridSquareSize={gridSquareSize} 
                //key={`node-pos-wrapper-${level}-${gridXPos}`}
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
    });
    
    return (
        <>
        {TreeViz}
        </>
    );
}

export default Tree;