import React, { useState, useRef } from "react";
import SortableArray from '../../sorting/components/SortableArray';
import { AVSquare, AlgorithmResponsiveDisplayWrapper } from "../../../components/elements/layout";
import { useResponsiveGrid } from "../../../hooks/useResponsiveGrid";
import { useResponsiveArray } from "../../sorting/hooks/useResponsiveArray";

const SortingPreviewSquare = (props) => {
    const containerRef = useRef(null);
    const {containerDimensions: dispContainerDimensions, xUnits: maxArrEntries, yUnits: maxArrVal} = useResponsiveGrid(containerRef, 40, 1, 20, 20);
    const [array, updateArrayVals, randomizeArrayVals, updateArrayLength] = useResponsiveArray(maxArrVal, maxArrEntries);
    const [graphState, setGraphState] = useState('NotRunning');
    const [isFocused, setIsFocused] = useState(false);

    const updateIsFocused = (focused) => {
        let newGraphState = "NotRunning"
        if (focused) newGraphState = "Running";
        if (!focused) updateArrayVals([...array]);
        setGraphState(newGraphState);
        setIsFocused(focused);
    }

    return (
        <AVSquare
            disabled={false}
            onClick={() => props.handleClick('/sorting')}
            setIsFocused={updateIsFocused}  
        >
            <h2 className="text-white">
                Sorting
            </h2>
            <div 
                className="preview-algoViz-wrapper"
            >
                <AlgorithmResponsiveDisplayWrapper                
                    containerRef={containerRef}
                >
                    <SortableArray 
                        graphVals={array}
                        algorithm={'Selection Sort'}
                        graphState={graphState}
                        setGraphState={setGraphState}
                        speed={1}
                        maxArrVal={maxArrVal}
                    />
                </AlgorithmResponsiveDisplayWrapper>
            </div>
    </AVSquare>
    );
}

export default SortingPreviewSquare;