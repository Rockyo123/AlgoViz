import React, { useState, useLayoutEffect } from "react"
import Node, { createRandomNode } from "./Node";
import { deepCopyTree, createTree, trimTree } from "../treeUtils";

const getTreeHeight = (node) => {
    if (!node) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
}

export const useResponsiveTree = (maxTreeHeight, defaultHeight=2) => {

    const [tree, setTree] = useState(createTree(defaultHeight));
    
    const [treeChangedFlag, setTreeChangedFlag] = useState(0);
    const treeHeight = getTreeHeight(tree);

    useLayoutEffect(() => {
        if (maxTreeHeight === 0) return;
        if (maxTreeHeight < treeHeight) {
            const newTree = trimTree(tree, maxTreeHeight);
            setTree(newTree);
            setTreeChangedFlag(prevVal => prevVal + 1);
        }
    }, [maxTreeHeight]);

    const findParentNodeInTreeFromPosition = (level, levelPos) => {
        let totalLevelNodes = Math.pow(2, level);
        let curLevel = 0;
        let curNode = tree;
        let comparisonVal = Math.ceil(totalLevelNodes / 2);
        //find parent node
        while (curNode && curLevel < level - 1){
            if (levelPos < comparisonVal){
                curNode = curNode.left;
                comparisonVal -= totalLevelNodes / (2 * Math.pow(2, curLevel+1));
            }
            else{
                curNode = curNode.right;
                comparisonVal += totalLevelNodes / (2 * Math.pow(2, curLevel+1));

            }
            curLevel++;
        }

        return [curNode, comparisonVal];
    }

    const addNodeToTree = (level, levelPos, value) => {
        const addedNode = (value === -1) ? createRandomNode() : new Node(value);
        let [parentNode, comparisonVal] = findParentNodeInTreeFromPosition(level, levelPos);
        
        if (levelPos < comparisonVal){
            parentNode.left = addedNode;
        }
        else {
            parentNode.right = addedNode;
        }
    }

    const removeNodeFromTree = (level, levelPos) => {
        let [parentNode, comparisonVal] = findParentNodeInTreeFromPosition(level, levelPos);
        if (levelPos < comparisonVal){
            parentNode.left = null;
        }
        else {
            parentNode.right = null;
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

    // will reset tree node colors all to white
    const resetTree = () => {
        const nodeQueue = [];
        const newTree = deepCopyTree(tree);
        nodeQueue.push(newTree);
        while (nodeQueue && nodeQueue.length){
            const curNode = nodeQueue.shift();

            if (!curNode) continue;

            curNode.color = 'white';
            nodeQueue.push(curNode.left);
            nodeQueue.push(curNode.right);
        }
        setTree(newTree);
        setTreeChangedFlag(prevState => prevState + 1);
    }

    const randomizeTreeVals = () => {
        const nodeQueue = [];
        const newTree = deepCopyTree(tree);
        nodeQueue.push(newTree);
        while (nodeQueue && nodeQueue.length){
            const curNode = nodeQueue.shift();

            if (!curNode) continue;
            const randomValue = Math.floor(Math.random() * 100) + 0;
            curNode.val = randomValue;
            nodeQueue.push(curNode.left);
            nodeQueue.push(curNode.right);
        }
        setTree(newTree);
        setTreeChangedFlag(prevState => prevState + 1);
    }

    return [ tree, treeHeight, treeChangedFlag, updateTree, randomizeTreeVals, resetTree ];
}