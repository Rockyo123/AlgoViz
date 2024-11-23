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

    //console.log('rocky debug: tree: ', tree);

    const addNodeToTree = (level, levelPos, value) => {
        const addedNode = (value === -1) ? createRandomNode() : new Node(value);
        //console.log('rocky debug: addedNode: ', addedNode, level, levelPos);
        let totalLevelNodes = Math.pow(2, level);
        let curLevel = 0;
        const newTree = tree;
        let curNode = newTree
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
        if (levelPos < comparisonVal){
            curNode.left = addedNode
        }
        else {
            curNode.right = addedNode
        }
        setTree(newTree);
        setTreeChangedFlag(prevState => prevState + 1);
    }

    const updateTree = (method, level, levelPos, value=-1) => {
        switch(method){
            case 'add': 
                addNodeToTree(level, levelPos, value);
            default:
                return;
        }
    }

    const randomizeTreeVals = () => {

    }

    return [ tree, treeHeight, treeChangedFlag, updateTree, randomizeTreeVals ];
}