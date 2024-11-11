import { checkOpStateRef } from '../hooks';
import { findStartNode } from './algorithmUtils';
import { DepthFirstSearch, BreadthFirstSearch } from './algorithms';

    
export const asyncPathFind = async (grid, algorithm, sendNextStep, opStateRef) => {

    const [startRow, startCol] = findStartNode(grid);

    if (startRow === -1 || startCol === -1) {
        return false;
    }
    let pathFindingAlgo = DepthFirstSearch;
    switch(algorithm.toLowerCase()){
        case 'depth first search':
            pathFindingAlgo = DepthFirstSearch;
            break;
        case 'breadth first search':
            pathFindingAlgo = BreadthFirstSearch;
            break;
        default:
            pathFindingAlgo = DepthFirstSearch;
            break;
    }

    await pathFindingAlgo(grid, [startRow, startCol], sendNextStep, opStateRef, checkOpStateRef);
}



