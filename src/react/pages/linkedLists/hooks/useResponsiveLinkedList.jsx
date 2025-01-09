import React, { useLayoutEffect, useState } from "react"
import Node from "./Node";
import { createLinkedList, deepCopyLinkedList, getListLength } from "../linkedListUtils";

export const useResponsiveLinkedList = (maxArrEntries, defaultLength=5) => {
    const [linkedList, setLinkedList] = useState(createLinkedList(defaultLength));
    const [linkedListChangedFlag, setLinkedListChangedFlag] = useState(0);
    const listLength = getListLength(linkedList);

    const updateLinkedListState = (listIn) => {
        setLinkedList(listIn);
        setLinkedListChangedFlag(prevState => prevState + 1);
    }

    useLayoutEffect(() => {
        if (maxArrEntries === 0) return;
        if (maxArrEntries < listLength) {
            const newList = removeNodeFromList(maxArrEntries-1);
            updateLinkedListState(newList)
        }
    }, [maxArrEntries]);


    const updateLinkedList = (method, idx, val) => {
        let newLinkedList = linkedList;
        switch(method){
            case 'add': 
                newLinkedList = addNodeToList();
                break;
            case 'remove':
                newLinkedList = removeNodeFromList(idx);
                break;
            case 'updateVal':
                newLinkedList = updateNodeVal(idx, val);
                break;
            default:
                break;
        }
        updateLinkedListState(newLinkedList)
    }

    const addNodeToList = () => {
        if (listLength >= maxArrEntries) return linkedList;

        const newList = deepCopyLinkedList(linkedList);
        let curNode = newList;
        while (curNode && curNode.next) {
            curNode = curNode.next;
        }
        const newNode = new Node(Math.floor(Math.random() * 100))
        curNode.next = newNode;
        return newList;
    }

    const removeNodeFromList = (idx) => {
        //TODO: removing first
        const newList = deepCopyLinkedList(linkedList);
        let curNode = newList;
        let curIdx = 0
        while (curNode && curIdx < (idx-1)) {
            curNode = curNode.next;
            curIdx++;
        }
        curNode.next = null;
        return newList;
    }

    const updateNodeVal = (idx, val) => {
        const newList = deepCopyLinkedList(linkedList);
        let curNode = newList;
        let curIdx = 0;
        while (curNode && curIdx < idx) {
            curNode = curNode.next;
            curIdx++;
        }
        curNode.val = val;
        return newList;
    }

    const randomizeLinkedList = () => {
        const newList = deepCopyLinkedList(linkedList);
        let curNode = newList;

        while (curNode){
            const randomValue = Math.floor(Math.random() * 100);
            curNode.val = randomValue;
            curNode = curNode.next;
        }
        updateLinkedListState(newList);
    }

    const resetList = () => {
        const newList = deepCopyLinkedList(linkedList);
        let curNode = newList;

        while (curNode){
            curNode.color = 'white';
            curNode = curNode.next;
        }
        updateLinkedListState(newList);
    }

    return [ linkedList, linkedListChangedFlag, updateLinkedList, randomizeLinkedList, resetList ];
}