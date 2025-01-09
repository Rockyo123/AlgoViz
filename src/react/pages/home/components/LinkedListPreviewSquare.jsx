import React, { useState, useRef } from "react";
import { AVSquare, AlgorithmResponsiveDisplayWrapper } from "@/components/elements/layout";
import { useResponsiveGrid } from "@/hooks";
import { useResponsiveLinkedList } from "@/pages/linkedLists/hooks/useResponsiveLinkedList";

import { MAX_LIST_NODES } from '@/constants';
import LinkedListViz from "@/pages/linkedLists/components/LinkedListViz";

/**
 * Square for home page that shows a preview of the tree viz when hovered or focused. 
 * On click, will navigate to that page
 * @param {Function} handleClick - Sends back link to graph page to navigate to when square clicked
 * @returns tree viz Preview Square.
 */
const LinkedListPreviewPage = ({ handleClick }) => {
    const containerRef = useRef(null);

    const {containerDimensions: dispContainerDimensions, xUnits: maxXUnits, yUnits: maxYUnits} = useResponsiveGrid(containerRef, 80, 80, MAX_LIST_NODES, MAX_LIST_NODES);
    const [ linkedList, linkedListChangedFlag, updateLinkedList, randomizeLinkedList, resetList ] = useResponsiveLinkedList(Math.max(maxXUnits, maxYUnits));

    const [vizState, setVizState] = useState('NotRunning');
    const [isFocused, setIsFocused] = useState(false);

    

    const updateIsFocused = (focused) => {
        let newGraphState = "NotRunning"
        if (focused) newGraphState = "Running";
        if (!focused) updateLinkedList(linkedList);
        setVizState(newGraphState);
        setIsFocused(focused);
    }

    return (
        <AVSquare
            disabled={false}
            onClick={() => handleClick('/linkedLists')}
            setIsFocused={updateIsFocused}  
        >
            <h2 className="text-white">
                Linked Lists
            </h2>
            <div 
                className="preview-algoViz-wrapper"
            >
                <AlgorithmResponsiveDisplayWrapper                
                    containerRef={containerRef}
                >
                    <LinkedListViz
                        linkedList={linkedList}
                        linkedListChangedFlag={linkedListChangedFlag}
                        updateLinkedList={updateLinkedList}
                        maxListLength={5}
                        containerDimensions={dispContainerDimensions}
                        listState={vizState}
                        setListState={setVizState}
                        editable={false}
                        speed={20}
                        target={3}
                        algorithm={'Breadth First Search'}
                    />
                </AlgorithmResponsiveDisplayWrapper>
            </div>
    </AVSquare>
    );
}

export default LinkedListPreviewPage;