import React from "react";
import RangeSlider from 'react-bootstrap-range-slider';

const Slider = ({val, setVal, min=1, max=100, tooltip="off"}) => {

    return (
        <RangeSlider
            value={val}
            onChange={changeEvent => setVal(changeEvent.target.value)}
            min={min}
            max={max}
            tooltip={tooltip}
        />
    )
}

export default Slider;