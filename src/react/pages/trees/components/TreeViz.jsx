import TreeNodePositionWrapper from "./TreeNode/TreeNodePositionWrapper";
import TreeNodeViz from "./TreeNode/TreeNodeViz";
import AddNewTreeNode from "./TreeNode/AddNewTreeNode";
import useSolveTree from './hooks/useSolveTree';

const Tree = ({ tree, treeHeight, maxTreeHeight, treeChangedFlag, gridSize, updateTree, speed, algorithm, target, vizState, updateVizState, editEnabled=true }) => {

    const trueHeight = Math.min(treeHeight, maxTreeHeight+1)
    const treeGridDimensions = [Math.pow(2, trueHeight)+1, trueHeight]
    const solvedTreeArr = useSolveTree(tree, treeChangedFlag, treeGridDimensions[0], target, vizState, updateVizState, speed, algorithm);

    const addTreeNode = (level, levelPos) => {        
        updateTree('add', level, levelPos, -1);
    }

    const removeTreeNode = (level, levelPos) => {
        updateTree('remove', level, levelPos, -1);
    }

    const updateNodeVal = (val, level, levelPos) => {
        updateTree('updateVal', level, levelPos, val);
    }

    const buildTreeVisualization = (treeArr, gridSize, treeGridDimensions, vizState, editEnabled) => {
        if (maxTreeHeight === 0) return <></>;
        const gridSquareSize = [gridSize.width / treeGridDimensions[0], gridSize.height / treeGridDimensions[1]]
        
        if (vizState !== 'NotStarted' || !editEnabled || treeHeight > maxTreeHeight) {
            gridSquareSize[1] = gridSize.height / (treeGridDimensions[1] - 1)
        }
        
        const TreeViz = treeArr.map((node, idx) => {
            if (!node) return <></>;
            const level = node.level;
            const levelPos = node.levelPos;
            const gridXPos = node.gridXPos;
            if (node.val === null) {
                if (vizState === 'NotStarted' && level < maxTreeHeight){
                    return (
                        <TreeNodePositionWrapper
                            level={level} 
                            gridXPos={gridXPos}
                            gridSquareSize={gridSquareSize} 
                        >
                            <AddNewTreeNode 
                                level={level}
                                levelPos={levelPos}
                                addTreeNode={addTreeNode}
                            />
                        </TreeNodePositionWrapper>
                    ); 
                }
                else{
                    return <></>;
                }
            } 
            return (
                <TreeNodePositionWrapper
                    level={level} 
                    gridXPos={gridXPos}
                    gridSquareSize={gridSquareSize} 
                >
                    <TreeNodeViz 
                        node={node}
                        level={level}
                        levelPos={levelPos}
                        editEnabled={vizState === 'NotStarted' && editEnabled}
                        handleNodeUpdateVal={updateNodeVal}
                        handleNodeRemove={removeTreeNode}
                    />
                </TreeNodePositionWrapper>
            ); 
        });

        return TreeViz
    }

    const TreeViz = buildTreeVisualization(solvedTreeArr, gridSize, treeGridDimensions, vizState, editEnabled);
      
    return (
        <>
        {TreeViz}
        </>
    );
}

export default Tree;