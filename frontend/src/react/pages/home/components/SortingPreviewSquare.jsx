import React, { useState, useRef } from "react";
import SortableArray from '../../sorting/components/SortableArray';
import { AVSquare, AlgorithmResponsiveDisplayWrapper } from "../../../components/elements/layout";
import { useResponsiveGrid } from "../../../hooks/useResponsiveGrid";
import { useResponsiveArray } from "../../sorting/hooks/useResponsiveArray";

/**
 * Square for home page that shows a preview of the sorting viz when hovered or focused. 
 * On click, will navigate to that page
 * @param {Function} handleClick - Sends back link to sorting page to navigate to when square clicked
 * @returns sorting viz Preview Square.
 */
const SortingPreviewSquare = ({ handleClick }) => {
    const containerRef = useRef(null);
    const {containerDimensions: dispContainerDimensions, xUnits: maxArrEntries, yUnits: maxArrVal} = useResponsiveGrid(containerRef, 40, 1, 20, 20);
    const [array, updateArrayVals, randomizeArrayVals, updateArrayLength] = useResponsiveArray(maxArrVal, maxArrEntries);
    const [graphState, setGraphState] = useState('NotRunning');

    const updateIsFocused = (focused) => {
        let newGraphState = "NotRunning"
        if (focused) newGraphState = "Running";
        if (!focused) updateArrayVals([...array]);
        setGraphState(newGraphState);
    }

    return (
        <AVSquare
            disabled={false}
            onClick={() => handleClick('/sorting')}
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