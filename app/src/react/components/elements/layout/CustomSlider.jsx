import React from "react";

/**
 * Slider component that renders an input slider with customizable range, value, and tooltip options.
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.val - The current value of the slider.
 * @param {Function} props.setVal - Callback function to update the slider value.
 * @param {number} [props.min=1] - The minimum value of the slider range.
 * @param {number} [props.max=100] - The maximum value of the slider range.
 * @param {string} [props.tooltip="off"] - Tooltip display setting; determines if the tooltip should be shown.
 * @returns {JSX.Element} The rendered Slider component.
 */
const Slider = ({ val, setVal, min=1, max=100, tooltip="off" }) => {
    return (
        <div style={{height:'calc(1.5em + .75rem + 2px)', paddingLeft: '5%', paddingRight: '5%', display: 'block', position: 'relative'}}>
            <input 
                className="av-input-slider" 
                type="range" 
                min={min} 
                max={max} 
                value={val} 
                onChange={(e) => setVal(e.target.value)}
            />
        </div>
    )
}

export default Slider;