import { checkOpStateRef } from '../hooks';
import { LinkedListSearch } from './algorithms';

    
export const asyncLinkedListSearch = async (head, target, algorithm, sendNextStep, opStateRef) => {

    let searchAlgo = LinkedListSearch;
    
    await searchAlgo(head, target, sendNextStep, opStateRef, checkOpStateRef);
}



