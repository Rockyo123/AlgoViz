import { isValid, directions } from "../algorithmUtils";

export const DepthFirstSearch = async (grid, startPos, sendNextStep, opStateRef, checkOpStateRef) => {
    const rows = grid.length;
    const cols = grid[0].length;

    const [startRow, startCol] = startPos;

    // Stack for DFS, with each element storing the current position (row, col)
    const stack = [[startRow, startCol]];
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    visited[startRow][startCol] = true;

    const curPath = [[startRow, startCol]];


    while (stack.length > 0) {

        const abort = await checkOpStateRef(opStateRef)
        if (abort) return;
        const [currentRow, currentCol] = stack.pop();
        curPath.push([currentRow, currentCol]);

        // Check if the goal is reached
        if (grid[currentRow][currentCol] === 2) {
            await sendNextStep(['found', curPath]);
            return true;
        }

        await sendNextStep(['visited', [[currentRow, currentCol]]])

        // Explore the neighbors
        for (const [dRow, dCol] of directions) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;
            
            if (isValid(newRow, newCol, grid, rows, cols) && !visited[newRow][newCol]) {
                visited[newRow][newCol] = true;
                stack.push([newRow, newCol]);
            }
        }
    } 

    await sendNextStep(['notFound', curPath]);
    return false;
}