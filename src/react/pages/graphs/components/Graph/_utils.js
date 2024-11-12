export const getNextStepFromInstrType = (instrType) => {
    let finished = 0;
    let newSquareVal = 0;
    switch (instrType) {
        case 'found':
            newSquareVal = 5;
            finished = 1;
            break;
        case 'notFound':
            newSquareVal = -5;
            finished = 1;
            break;
        case 'visited':
            newSquareVal = 3;
            finished = 0;
            break;
        default:
            break;
    }
    return [newSquareVal, finished];
}

export const updateSquaresWithVal = (graph, squaresToUpdate, val) => {
    for (const square of squaresToUpdate){
        if (graph[square[0]][square[1]] !== 1 && graph[square[0]][square[1]] !== 2){
            graph[square[0]][square[1]] = val;
        }
    }
}