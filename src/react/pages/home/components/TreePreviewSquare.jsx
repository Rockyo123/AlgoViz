import React, { useState, useRef } from "react";
import TreeViz from '@/pages/trees/components/TreeViz'
import { AVSquare, AlgorithmResponsiveDisplayWrapper } from "@/components/elements/layout";
import { useResponsiveGrid } from "@/hooks";
import { useResponsiveTree } from '@/pages/trees/hooks/useResponsiveTree'
import { MAX_TREE_HEIGHT, MAX_TREE_WIDTH } from "@/constants";

/**
 * Square for home page that shows a preview of the tree viz when hovered or focused. 
 * On click, will navigate to that page
 * @param {Function} handleClick - Sends back link to graph page to navigate to when square clicked
 * @returns tree viz Preview Square.
 */
const TreePreviewSquare = ({ handleClick }) => {
    const containerRef = useRef(null);
    const {containerDimensions: dispContainerDimensions, xUnits: maxXUnits, yUnits: maxYUnits} = useResponsiveGrid(containerRef, 20, 20, MAX_TREE_WIDTH, MAX_TREE_HEIGHT);
    const [ tree, treeHeight, treeChangedFlag, updateTree, randomizeTreeVals, resetTree ] = useResponsiveTree(2, 2);

    const [vizState, setVizState] = useState('NotRunning');
    const [isFocused, setIsFocused] = useState(false);

    

    const updateIsFocused = (focused) => {
        let newGraphState = "NotRunning"
        if (focused) newGraphState = "Running";
        if (!focused) updateTree(tree);
        setVizState(newGraphState);
        setIsFocused(focused);
    }

    return (
        <AVSquare
            disabled={false}
            onClick={() => handleClick('/trees')}
            setIsFocused={updateIsFocused}  
        >
            <h2 className="text-white">
                Trees
            </h2>
            <div 
                className="preview-algoViz-wrapper"
            >
                <AlgorithmResponsiveDisplayWrapper                
                    containerRef={containerRef}
                >
                    <TreeViz
                        tree={tree}
                        treeHeight={treeHeight+1}
                        maxTreeHeight={3}
                        treeChangedFlag={treeChangedFlag}
                        gridSize={dispContainerDimensions}
                        updateTree={updateTree}
                        speed={20}
                        algorithm={'Breadth First Search'}
                        target={6}
                        vizState={vizState}
                        updateVizState={setVizState}
                        editEnabled={false}
                        animate={false}
                    />
                </AlgorithmResponsiveDisplayWrapper>
            </div>
    </AVSquare>
    );
}

export default TreePreviewSquare;