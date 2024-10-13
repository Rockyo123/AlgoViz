//  hook that handles performing async operations.
//  takes in operation to perform
//  returns stack of operations to perforam and a function to cancel operation

import { useEffect, useRef, useState } from "react"

export const useAsyncOperation = () => {
    const [operation, setOperation] = useState(null);
    const opQueue = useRef([]);
    const abortRef = useRef(false);

    const updateOpQueue = (nextOp) => {
        opQueue.current.push(nextOp);
    }

    const abortOperation = () => {
        abortRef.current = true;
    }

    useEffect(() => {
        if (operation){
            abortRef.current = false;
            operation(updateOpQueue, abortRef)
        }
    }, [operation])

    return {opQueue, setOperation, abortOperation}
}

