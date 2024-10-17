import { useEffect, useState } from 'react';

export const useGraphStateManager = (handleAlgoFinished, initialState = 'NotStarted') => {
    const [graphState, setGraphState] = useState(initialState);
    const [graphStateBtnText, setGraphStateBtnText] = useState('Start');

    useEffect(() => {
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
        setGraphStateBtnText(newText);
    }, [graphState]);

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
