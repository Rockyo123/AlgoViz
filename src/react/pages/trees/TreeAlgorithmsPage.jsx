import React, {useState, useRef} from "react";
import DropdownSelector from "@/components/elements/dropdown/DropdownSelector";
import PlaybackBtnSection from "@/components/elements/playback/PlaybackBtnSection";
import { HeaderSelectorsContainer, HeaderSelector, AlgorithmResponsiveDisplayWrapper, Slider } from "@/components/elements/layout";
import { useResponsiveGrid } from "@/hooks/useResponsiveGrid";
import { useVizStateManager } from "@/hooks/useVizStateManager";
import { useResponsiveTree } from "./hooks/useResponsiveTree";
import { MAX_TREE_HEIGHT, MAX_TREE_WIDTH, TREE_ALGS } from "@/constants";
import TreeViz from "./components/treeViz";
const TreeAlgorithmsPage = () => {  
    const containerRef = useRef(null);
    const {containerDimensions: dispContainerDimensions, xUnits: maxTreeWidth, yUnits: maxTreeHeight} = useResponsiveGrid(containerRef, 50, 50, MAX_TREE_HEIGHT, MAX_TREE_WIDTH);
    const [ tree, treeHeight, treeChangedFlag, updateTree, randomizeTreeVals ] = useResponsiveTree(maxTreeHeight);
    
    const [algorithm, setAlgorithm] = useState('Breadth First Search');
    const [speed, setSpeed] = useState(50);

    const { vizState, vizStateBtnText, toggleVizState, setVizStateWithVal } = useVizStateManager(randomizeTreeVals, [tree, algorithm]);
    
    const resetSteps = () => {
        //updateArrayVals([...array]);
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
                label={"Num Entries"}
                selector={
                    <>
                    {/*<Slider 
                        val={array.length}
                        setVal={updateArrayLength}
                        min={10}
                        max={maxArrEntries}
                        tooltip={"auto"}
                    /> */}
                    </>
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
            treeChangedFlag={treeChangedFlag}
            gridSize={dispContainerDimensions}
            updateTree={updateTree}
        />
        
    </AlgorithmResponsiveDisplayWrapper>
</div>
)
}

export default TreeAlgorithmsPage;