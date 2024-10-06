export const getSelectedSquares = (curPoints, toolType, initX, initY, curX, curY) => {
    let selectedPoints = [];
    switch (toolType){
        case 'free':
            selectedPoints = freeGetSelectedSquares(curPoints, curX, curY);
            break;
        case 'bucket':
            selectedPoints = bucketGetSelectedSquares(initX, initY, curX, curY);
            break;
        case 'line':
            selectedPoints = lineGetSelectedSquares(initX, initY, curX, curY);
            break;
        default:
            break;
    }
    return selectedPoints;
}

const freeGetSelectedSquares = (curPoints, curX, curY) => {
    const points = [...curPoints];
    points.push([curX, curY])
    return points;
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

//using Bresenhams Algo
const lineGetSelectedSquares = (initX, initY, curX, curY) => {
    let selectedSquares = [];

    let dx = Math.abs(curX - initX);
    let dy = Math.abs(curY - initY);

    let sx = initX < curX ? 1 : -1;
    let sy = initY < curY ? 1 : -1;

    let err = dx - dy;

    let x = initX;
    let y = initY;

    while (true) {
        selectedSquares.push([x, y]);

        if (x === curX && y === curY) break;

        let e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x += sx;
        }
        if (e2 < dx) {
            err += dx;
            y += sy;
        }
    }

    return selectedSquares;
};