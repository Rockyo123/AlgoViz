import { useEffect, useState } from 'react';

export const useVizStateManager = (handleAlgoFinished, dependencyArray=[], initialState = 'NotStarted') => {
    const [vizState, setVizState] = useState(initialState);

    const vizStateBtnText = (() => {
        let newText = 'Start';
        switch (vizState) {
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
        setVizState('NotStarted');
    }, dependencyArray)

    const toggleVizState = () => {
        let newState = vizState;
        switch (vizState) {
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
        setVizState(newState);
    };

    const setVizStateWithVal = (valIn) => {
        setVizState(valIn);
    }

    return { vizState, vizStateBtnText, toggleVizState, setVizStateWithVal };
};
