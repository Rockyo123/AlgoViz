import { checkOpStateRef } from '../hooks';
import { DepthFirstSearch, BreadthFirstSearch } from './algorithms';

    
export const asyncTreeSearch = async (root, target, algorithm, sendNextStep, opStateRef) => {

    let searchAlgo = DepthFirstSearch;
    switch(algorithm.toLowerCase()){
        case 'depth first search':
            searchAlgo = DepthFirstSearch;
            break;
        case 'breadth first search':
            searchAlgo = BreadthFirstSearch;
            break;
        default:
            searchAlgo = DepthFirstSearch;
            break;
    }

    await searchAlgo(root, target, sendNextStep, opStateRef, checkOpStateRef);
}



