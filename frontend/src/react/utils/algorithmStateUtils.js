export const checkAbortRef = async (abortRef) => {
    while (abortRef.current){
        await new Promise(resolve => setTimeout(resolve, 50)); // Wait for 50ms before checking again
    }
} 
