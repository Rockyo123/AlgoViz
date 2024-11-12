import { isValid, directions } from "../algorithmUtils";

export const BreadthFirstSearch = async (grid, startPos, sendNextStep, opStateRef, checkOpStateRef) => {
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
        const abort = await checkOpStateRef(opStateRef)
        if (abort) return;

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
    await sendNextStep(['notFound', []]);
    return false;
}