export const getSelectedSquares = (toolType, initX, initY, curX, curY) => {
    let selectedPoints = [];
    switch (toolType){
        case 'pen':
            break;
        case 'bucket':
            selectedPoints = bucketGetSelectedSquares(initX, initY, curX, curY) 
            break;
        default:
            break;
    }
    return selectedPoints;
}


const bucketGetSelectedSquares = (initX, initY, curX, curY) => {
    const points = []
    const minX = Math.min(initX, curX);
    const maxX = Math.max(initX, curX);
    const minY = Math.min(initY, curY);
    const maxY = Math.max(initY, curY);
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            points.push([x, y]);
        }
    }
    return points;
    };

const lineGetSelectedSquares = (initX, initY, curX, curY) => {
    //TODO: Bresenhams line algo
}