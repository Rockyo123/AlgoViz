import React from "react";

const Slider2 = ({val, setVal, min=1, max=100, tooltip="off"}) => {
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

export default Slider2;