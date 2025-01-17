import React, {useState, useRef} from "react";
import DropdownSelector from "@/components/elements/dropdown/DropdownSelector";
import PlaybackBtnSection from "@/components/elements/playback/PlaybackBtnSection";
import { HeaderSelectorsContainer, HeaderSelector, AlgorithmResponsiveDisplayWrapper, Slider } from "@/components/elements/layout";
import { useResponsiveGrid } from "@/hooks/useResponsiveGrid";
import { useVizStateManager } from "@/hooks/useVizStateManager";
import { useResponsiveTree } from "./hooks/useResponsiveTree";
import { MAX_TREE_HEIGHT, MAX_TREE_WIDTH, TREE_ALGS } from "@/constants";
import TreeViz from "./components/TreeViz";

const TreeAlgorithmsPage = () => {  
    const containerRef = useRef(null);
    const {containerDimensions: dispContainerDimensions, xUnits: maxTreeWidth, yUnits: maxTreeHeight} = useResponsiveGrid(containerRef, 30, 30, MAX_TREE_WIDTH, MAX_TREE_HEIGHT);
    const [ tree, treeHeight, treeChangedFlag, updateTree, randomizeTreeVals, resetTree ] = useResponsiveTree(maxTreeHeight);
    const [algorithm, setAlgorithm] = useState('Breadth First Search');
    const [speed, setSpeed] = useState(50);
    const [target, setTarget] = useState(20);
    const { vizState, vizStateBtnText, toggleVizState, setVizStateWithVal } = useVizStateManager(resetTree, [tree, algorithm]);
    
    const resetSteps = () => {
        resetTree();
    }

return (
    <div className="algorithms-page"> 
        <div className="full-width centered-row">
            <h1 className="text-white">
                Trees
            </h1>
        </div>
        <div className="full-width centered-row">
            <HeaderSelectorsContainer>
            <>
                <HeaderSelector
                    label={"Algorithm"}
                    selector={
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <DropdownSelector 
                                val={algorithm}
                                setVal={setAlgorithm}
                                options={TREE_ALGS}
                            />                            
                        </div>
                    }
                />
                <HeaderSelector
                    label={"Target"}
                    selector={
                        <input
                            className="av-input"
                            type='number'
                            value={target}
                            style={{maxWidth: '90%'}}
                            aria-label="target value"
                            onChange={(e) => setTarget(parseInt(e.target.value))}
                        />

                    }
                />
                <HeaderSelector
                    label={"Speed"}
                    selector={
                        <Slider
                            val={speed}
                            setVal={setSpeed}
                            min={1}
                            max={1000}
                        />
                    }
                />
            </>
            </HeaderSelectorsContainer>
        </div>

        <PlaybackBtnSection 
            randomizeGraph={randomizeTreeVals}
            resetSteps={resetSteps}
            toggleVizState={toggleVizState}
            btnText={vizStateBtnText}
        />
            
        <AlgorithmResponsiveDisplayWrapper                
            containerRef={containerRef}
        >
            <TreeViz
                tree={tree}
                treeHeight={treeHeight+1}
                maxTreeHeight={maxTreeHeight}
                treeChangedFlag={treeChangedFlag}
                gridSize={dispContainerDimensions}
                updateTree={updateTree}
                speed={speed}
                algorithm={algorithm}
                target={target}
                vizState={vizState}
                updateVizState={setVizStateWithVal}
            />
            
        </AlgorithmResponsiveDisplayWrapper>
    </div>
    );
}

export default TreeAlgorithmsPage;