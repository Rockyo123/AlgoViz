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