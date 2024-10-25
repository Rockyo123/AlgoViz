import React, { useState, useEffect } from "react";

/**
 * ClampedBlurInput renders a numeric input field. 
 * The value is clamped between a specified min and max 
 * and updateVal is updated only when the input field loses focus (onBlur).
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {number} props.val - The initial value for the input field.
 * @param {number} props.min - The minimum allowed value for the input.
 * @param {number} props.max - The maximum allowed value for the input.
 * @param {function} props.updateVal - A callback function to update the 
 * value when the input loses focus.
 * @param {Object} [props.style] - Optional inline styles for the input.
 *
 * @returns {JSX.Element} The rendered input element.
 */
const ClampedBlurInput = (props) =>  {
    const [val, setVal] = useState(props.val);

    useEffect(() => {
        setVal(props.val);
    },[props.val]);
    
    return <input
        type="number"
        className="av-input"
        style={props.style}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={(e) => {
            let val = Math.max(props.min, Math.min(props.max, e.target.value));
            props.updateVal(val);
        } } />;
}

export default ClampedBlurInput;