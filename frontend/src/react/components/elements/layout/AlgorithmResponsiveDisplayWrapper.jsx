import React from "react";

//handles the width and height of the display wrapper, also will send back current left, top, height and width of the display.
const AlgorithmResponsiveDisplayWrapper = ({containerRef, children }) => {
    return (
        <div className="algorithm-viz-wrapper" ref={containerRef}>
            {children}
        </div>
    );
}

export default AlgorithmResponsiveDisplayWrapper;