export const getNextStepFromInstrType = (instrType) => {
    let finished = 0;
    let color = 'white'
    switch (instrType) {
        case 'found':
            color = 'green';
            finished = 1;
            break;
        case 'notFound':
            color = 'red';
            finished = 1;
            break;
        case 'visited':
            color = 'blue';
            finished = 0;
            break;
        default:
            break;
    }
    return [color, finished];    
}

export const updateNodeWithColor = (root, nodeId, color) => {
    let setAllToRed = (nodeId === -1) ? true : false; 

    let nodeQueue = [];
    nodeQueue.push(root);

    while(nodeQueue && nodeQueue.length){
        const curNode = nodeQueue.shift();
        if (!curNode) continue;
        if (setAllToRed){
            curNode.color = 'red'
        }
        else if (curNode.id === nodeId){
            curNode.color = color;
            return;
        }
        nodeQueue.push(curNode.left);
        nodeQueue.push(curNode.right);
    }
}