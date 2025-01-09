import useSolveLinkedList from "./hooks/useSolveLinkedList";
import LinkedListNode from "./LinkedListNode";
import { Xwrapper } from "react-xarrows";

const LinkedListViz = ({ linkedList, linkedListChangedFlag, maxListLength, updateLinkedList, containerDimensions, listState, setListState, speed, target, algorithm, editable }) => {

    const solvedLinkedListArr = useSolveLinkedList(linkedList, linkedListChangedFlag, listState, setListState, target, speed, algorithm);
    
    const addNode = (idx) => {
        updateLinkedList('add', idx, -1);
    }

    const removeNode = (idx) => {
        updateLinkedList('remove', idx, -1);
    }

    const updateNodeVal = (idx, val) => {
        updateLinkedList('updateVal', idx, val)
    }

    return (
            <div
                className="linked-list-dnd-box"
            >
                <Xwrapper>
                    {solvedLinkedListArr.map((node, idx) => {
                        const nodeDistance = (containerDimensions.width) / solvedLinkedListArr.length;
                        const nodeWidth = Math.min(Math.max(nodeDistance - (nodeDistance / 2), 50), 300);
                        const left = nodeDistance * (idx+1) - (nodeDistance / 2) - (nodeWidth / 2);
                        return (
                            <LinkedListNode 
                                node={node}
                                top={`calc(50% - ${'30px'})`}
                                left={left}
                                width={nodeWidth}
                                idx={idx}
                                includeAddNode={((idx+1) === solvedLinkedListArr.length && idx+1 < maxListLength)}
                                editable={editable && listState ==='NotStarted'}
                                addNode={addNode}
                                removeNode={removeNode}
                                updateNodeVal={updateNodeVal}
                            />
                        )
                    })}
                </Xwrapper>

            </div>
    )
}

export default LinkedListViz;