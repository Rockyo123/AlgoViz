// Helper function to check if a position is within the grid bounds and traversable
export const isValid = (row, col, grid, rowLen, colLen) => {
    return row >= 0 && row < rowLen && col >= 0 && col < colLen && grid[row][col] !== -1;
}
   
export const directions = [
    [0, 1],   // Right
    [1, 0],   // Down
    [0, -1],  // Left
    [-1, 0]   // Up
];

export const findStartNode = (grid) => {
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