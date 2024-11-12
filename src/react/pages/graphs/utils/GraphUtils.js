export const deepCopyGraphVals = (graphVals) => {
    return graphVals.map(row => [...row]); // Creates a new array for each row
}
