import React, {useEffect, useRef} from "react"


/** MANAGES STATE OF THE ASYNC OPERATION. 
 *  FOUR ACTIONS:
 *      1. Start:  Algorithm starts from beginning. Should be used only when op is not running.
 *      2. Pause:  Algorithm is paused. algorithm should still exist, as resuming will pick up from where it left off. 
 *                 Can be accomplished by running an infinite while loop until state is resumed or aborted.
 *      3. Resume: Algorithm is currently running and sending new steps through executeNextStep function.
 *      4. Abort:  Algorithm is aborted, will return and get rid of algorithm
 * 
 * */ 
export const useAsyncOperationController = (startOperation) => {
    const opStateRef = useRef('notStarted');

    const runOp = () => {
        if (opStateRef.current === 'notStarted'){
            opStateRef.current = 'running';
            startOperation(opStateRef);
            return;
        }
        else{
            opStateRef.current = 'running';
        }
    }
    
    const pauseOp = () => {
        if (opStateRef.current === 'notStarted') return;
        opStateRef.current = 'paused';
    }

    const abortOp = () => {
        opStateRef.current = 'notStarted';
    }    
        
    return {opStateRef, runOp, pauseOp, abortOp}
}

export const checkOpStateRef = async (opStateRef) => {
    if (opStateRef.current === 'notStarted') return true;
    while (opStateRef.current === 'paused'){
        await new Promise(resolve => setTimeout(resolve, 50)); // Wait for 50ms before checking again
    }
    return false;
} 