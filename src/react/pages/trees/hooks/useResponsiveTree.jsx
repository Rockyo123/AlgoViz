import React, { useEffect, useState } from "react"
import Node from "./Node";
export const useResponsiveTree = (maxTreeHeight, defaultHeight=4) => {
    const [tree, setTree] = useState(
        new Node(1, new Node(2, new Node(5), new Node(7)), new Node(3, new Node(8), new Node(9, new Node(11), new Node(10))))
    );
    const [treeHeight, setTreeHeight] = useState(5);

    const updateTree = (newTree) => {

    }

    const randomizeTreeVals = () => {

    }

    return [ tree, treeHeight, updateTree, randomizeTreeVals ];
}