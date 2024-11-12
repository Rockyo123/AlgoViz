import React, {useEffect, useState, useRef} from 'react';

export const useLatestRef = (state) => {

    const stateRef = useRef(state);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    return stateRef;
}