export const fetchSquareCoordAtPoint = (x, y, numXVals, numYVals, graphWidth, graphHeight) => {
    const squareLength = graphWidth / numXVals;
    const squareHeight = graphHeight / numYVals;
    const xCoord = Math.floor(x / squareLength);
    const yCoord = Math.floor(y / squareHeight);
    return [xCoord, yCoord]
}