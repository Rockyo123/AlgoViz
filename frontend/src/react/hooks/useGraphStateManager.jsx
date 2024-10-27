import { useEffect, useState } from 'react';

export const useGraphStateManager = (handleAlgoFinished, dependencyArray=[], initialState = 'NotStarted') => {
    const [graphState, setGraphState] = useState(initialState);

    const graphStateBtnText = (() => {
        let newText = 'Start';
        switch (graphState) {
            case 'NotStarted':
                    newText = 'Start';
                    break;
                case 'Running':
                    newText = 'Pause';
                    break;
                case 'Paused':
                    newText = 'Resume';
                    break;
                case 'Finished':
                    newText = 'Finished';
                    break;
                default:
                    break;
        }
        return newText;
    })();

    useEffect(() => {
        setGraphState('NotStarted');
    }, dependencyArray)

    const toggleGraphState = () => {
        let newState = graphState;
        switch (graphState) {
            case 'NotStarted':
            case 'Paused':
                newState = 'Running';
                break;
            case 'Running':
                newState = 'Paused';
                break;
            case 'Finished':
                handleAlgoFinished();
                newState = 'NotStarted';
                break;
            default:
                break;
        }
        setGraphState(newState);
    };

    const setGraphStateWithVal = (valIn) => {
        setGraphState(valIn);
    }

    return { graphState, graphStateBtnText, toggleGraphState, setGraphStateWithVal };
};
