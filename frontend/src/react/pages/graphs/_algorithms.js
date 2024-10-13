// Helper function to check if a position is within the grid bounds and traversable
const isValid = (row, col, grid, rowLen, colLen) => {
    return row >= 0 && row < rowLen && col >= 0 && col < colLen && grid[row][col] !== -1;
}
   
const directions = [
    [0, 1],   // Right
    [1, 0],   // Down
    [0, -1],  // Left
    [-1, 0]   // Up
];

const findStartNode = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;
    // Find the start node (value 1)
    let startRow = -1;
    let startCol = -1;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                startRow = i;
                startCol = j;
                break;
            }
        }
        if (startRow !== -1) break;
    }
    return [startRow, startCol];
}
    
export const pathFind = async (grid, algorithm, sendNextStep, abortRef) => {

    const [startRow, startCol] = findStartNode(grid);

    if (startRow === -1 || startCol === -1) {
        return false;
    }

    let pathFindingAlgo = DepthFirstSearch
    switch(algorithm.toLowerCase()){
        case 'depth first search':
            pathFindingAlgo = DepthFirstSearch
            break;
        case 'breadth first search':
            pathFindingAlgo = BreadthFirstSearch
            break;
        default:
            pathFindingAlgo = DepthFirstSearch;
            break;
    }

    await pathFindingAlgo(grid, [startRow, startCol], sendNextStep, abortRef);

}

const DepthFirstSearch = async (grid, startPos, sendNextStep, abortRef) => {
        const rows = grid.length;
        const cols = grid[0].length;

        const [startRow, startCol] = startPos;

        // Stack for DFS, with each element storing the current position (row, col)
        const stack = [[startRow, startCol]];
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        visited[startRow][startCol] = true;

        const curPath = [[startRow, startCol]];

    
        while (stack.length > 0) {
            console.log('rocky debug: abortRef: ', abortRef)
            if(abortRef.current) return;
            const [currentRow, currentCol] = stack.pop();
            curPath.push([currentRow, currentCol]);

            // Check if the goal is reached
            if (grid[currentRow][currentCol] === 2) {
                console.log("Goal found!");
                await sendNextStep(['found', curPath]);
                return true;
            }
    

            await sendNextStep(['visited', [[currentRow, currentCol]]])

            // Explore the neighbors
            for (const [dRow, dCol] of directions) {
                const newRow = currentRow + dRow;
                const newCol = currentCol + dCol;
                
                if (isValid(newRow, newCol, grid, rows, cols) && !visited[newRow][newCol]) {
                    console.log('rocky debug: isValid')
                    visited[newRow][newCol] = true;
                    stack.push([newRow, newCol]);
                }
            }
        } 
    
        console.log("Goal not reachable");
        await sendNextStep(['notFound', curPath]);
        return false;
}

const BreadthFirstSearch = async (grid, startPos, sendNextStep, abortRef) => {
    const rows = grid.length;
    const cols = grid[0].length;

    const [startRow, startCol] = startPos;
    
    // queue for BFS, with each element storing the current position (row, col)
    const queue = [[startRow, startCol]];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    visited[startRow][startCol] = true;

    // Track predecessors to reconstruct the shortest path
    const predecessors = Array.from({ length: rows }, () => Array(cols).fill(null));
    predecessors[startRow][startCol] = [startRow, startCol];

    while (queue.length > 0) {
        if(abortRef.current) return;
        const [currentRow, currentCol] = queue.shift();

        if (grid[currentRow][currentCol] === 2) {
            const shortestPath = [];
            let [row, col] = [currentRow, currentCol];
            while (predecessors[row][col] !== null) {
                shortestPath.unshift([row, col]);
                [row, col] = predecessors[row][col];
                if (row === startRow && col === startCol) {
                    shortestPath.unshift([startRow, startCol]);
                    break;
                }
            }
            await sendNextStep(['found', shortestPath]);
            return true;
        }
        await sendNextStep(['visited', [[currentRow, currentCol]]])

        // Explore the neighbors
        for (const [dRow, dCol] of directions) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;
            
            if (isValid(newRow, newCol, grid, rows, cols) && !visited[newRow][newCol]) {
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol]);
                predecessors[newRow][newCol] = [currentRow, currentCol]; // Track the predecessor
            }
        }
    }  

    console.log("Goal not reachable");
    await sendNextStep(['notFound', []]);
    return false;
}