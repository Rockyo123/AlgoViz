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

export const updateNodeWithColor = (head, nodeIdx, color) => {
    let setAllToRed = (nodeIdx === -1) ? true : false; 

    let curNode = head;
    let curIdx = 0;
    
    while(curNode){
        if (setAllToRed){
            curNode.color = 'red'
        }
        else if (curIdx === nodeIdx){
            curNode.color = color;
            return;
        }
        curNode = curNode.next;
        curIdx++;
    }
}