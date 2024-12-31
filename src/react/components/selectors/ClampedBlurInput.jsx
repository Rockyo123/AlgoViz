import React, { useState, useEffect } from "react";

/**
 * ClampedBlurInput renders a numeric input field. 
 * The value is clamped between a specified min and max 
 * and updateVal is updated only when the input field loses focus (onBlur).
 *
 * @component
 * @param {number} val - The initial value for the input field.
 * @param {number} min - The minimum allowed value for the input.
 * @param {number} max - The maximum allowed value for the input.
 * @param {function} updateVal - A callback function to update the 
 * value when the input loses focus.
 * @param {Object} [style] - Optional inline styles for the input.
 *
 * @returns {JSX.Element} The rendered input element.
 */
const ClampedBlurInput = ({ val, min, max, updateVal, style={}, customClassName="" }) =>  {
    const [curInput, setCurInput] = useState(val);

    useEffect(() => {
        setCurInput(val);
    },[val]);
    
    return <input
        type="number"
        className={customClassName}
        style={style}
        value={curInput}
        onChange={(e) => setCurInput(e.target.value)}
        onBlur={(e) => {
            let val = Math.max(min, Math.min(max, e.target.value));
            updateVal(val);
        } } />;
}

export default ClampedBlurInput;