import Node from "./hooks/Node";

export const deepCopyTree = (root) => {
    if (!root) return null;
    const newTree = new Node(root.val);
    newTree.id = root.id
    newTree.color = root.color
    newTree.left = deepCopyTree(root.left);
    newTree.right = deepCopyTree(root.right);
    return newTree;
}

export const createTree = (height) => {

    let value = 1;

    const buildTree = (currentHeight) => {
        if (currentHeight > height) return null;

        const node = new Node(value++);
        node.left = buildTree(currentHeight + 1);
        node.right = buildTree(currentHeight + 1);
        return node;
    };
    return buildTree(0);
}

export const trimTree = (tree, height) => {
    if (height < 0 || !tree) {
        return null;
    }
    const newTree = new Node(tree.val);
    newTree.id = tree.id
    if (height > 0) {
        newTree.left = trimTree(tree.left, height - 1);
        newTree.right = trimTree(tree.right, height - 1);
    }

    return newTree;
}

export const createTreeArr = (rootIn, treeHeight) => {
    const heightToUse = treeHeight + 1;
    const arrLen = Math.pow(2, heightToUse+1) - 1;
    const treeArr = new Array(arrLen).fill(null)
    const nodeQueue = [];
    const width = Math.pow(2, heightToUse+1)+1;

    const childGridXDistance = Math.floor(Math.floor((width) / 2) / 2);
    const gridXPos = Math.floor(childGridXDistance / 2);

    nodeQueue.push([rootIn, 0, 0, childGridXDistance, gridXPos]);
    
    while (nodeQueue && nodeQueue.length){
        const [curNode, level, levelPos, gridXPos, childGridXDistance] = nodeQueue.shift();
        const levelIdx = Math.pow(2, level) - 1;
        const idx = levelIdx + levelPos;
        if (!curNode){
            treeArr[idx] = {
                //'id': -1,
                'val': null,
                'color': 'white',
                'level': level,
                'levelPos': levelPos,
                'gridXPos': gridXPos
            }
            continue;
        }
        const arrNode = {
            //'id': curNode.id,
            'val': curNode.val,
            'color': curNode.color,
            'level': level,
            'levelPos': levelPos,
            'gridXPos': gridXPos
        }

        treeArr[idx] = arrNode;
        nodeQueue.push([curNode.left, level+1, (2 * levelPos),     gridXPos-childGridXDistance, Math.floor(childGridXDistance/2)]);
        nodeQueue.push([curNode.right,level+1, (2 * levelPos) + 1, gridXPos+childGridXDistance, Math.floor(childGridXDistance/2)]);
    }
    return treeArr;
}

export const getTreeHeight = (node) => {
    if (!node) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
}