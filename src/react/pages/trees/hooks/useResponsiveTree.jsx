import React, { useState } from "react"
import Node, { createRandomNode } from "./Node";

const getTreeHeight = (node) => {
    if (!node) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
}

export const useResponsiveTree = (maxTreeHeight, defaultHeight=4) => {
    const [tree, setTree] = useState(
        new Node(1, new Node(2, new Node(5, new Node(3)), new Node(7)), new Node(3, new Node(8), new Node(9, new Node(11), new Node(10))))
    );
    const [treeChangedFlag, setTreeChangedFlag] = useState(0);
    const treeHeight = getTreeHeight(tree);

    console.log('rocky debug: tree: ', tree);

    const findParentNodeInTreeFromPosition = (level, levelPos) => {
        let totalLevelNodes = Math.pow(2, level);
        let curLevel = 0;
        let curNode = tree;
        let comparisonVal = Math.ceil(totalLevelNodes / 2);
        //find parent node
        while (curNode && curLevel < level - 1){
            if (levelPos < comparisonVal){
                curNode = curNode.left;
                //this needs to be 2
                comparisonVal -= totalLevelNodes / (2 * Math.pow(2, curLevel+1))
            }
            else{
                curNode = curNode.right;
                comparisonVal += totalLevelNodes / (2 * Math.pow(2, curLevel+1))

            }
            curLevel++;
        }

        return [curNode, comparisonVal];
    }

    const addNodeToTree = (level, levelPos, value) => {
        const addedNode = (value === -1) ? createRandomNode() : new Node(value);
        let [parentNode, comparisonVal] = findParentNodeInTreeFromPosition(level, levelPos);
        
        if (levelPos < comparisonVal){
            parentNode.left = addedNode
        }
        else {
            parentNode.right = addedNode
        }
    }

    const removeNodeFromTree = (level, levelPos) => {
        let [parentNode, comparisonVal] = findParentNodeInTreeFromPosition(level, levelPos);
        if (levelPos < comparisonVal){
            parentNode.left = null;
        }
        else {
            parentNode.right = null
        }
    }

    const updateTreeVal = (level, levelPos, value) => {
        let nodeToUpdate = null;
        let [parentNode, comparisonVal] = findParentNodeInTreeFromPosition(level, levelPos);
        if (levelPos < comparisonVal){
            nodeToUpdate = parentNode.left;
            nodeToUpdate.val = parseInt(value);
        }
        else {
            nodeToUpdate = parentNode.right;
            nodeToUpdate.val = parseInt(value);
        }
        console.log('rocky ebug: updated: ', value, parentNode, nodeToUpdate)
    }

    const updateTree = (method, level, levelPos, value=-1) => {
        const newTree = tree;
        switch(method){
            case 'add': 
                addNodeToTree(level, levelPos, value);
                break;
            case 'remove':
                removeNodeFromTree(level, levelPos);
                break;
            case 'updateVal':
                updateTreeVal(level, levelPos, value);
                break;
            default:
                break;
        }
        setTree(newTree);
        setTreeChangedFlag(prevState => prevState + 1);
    }

    const randomizeTreeVals = () => {

    }

    return [ tree, treeHeight, treeChangedFlag, updateTree, randomizeTreeVals ];
}