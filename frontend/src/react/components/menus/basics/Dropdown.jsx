import React, {useState, useRef} from "react";
import { useSpring, animated } from "@react-spring/web";
import useMeasure from 'react-use-measure';

const Dropdown = (props) => {
    const [isOpen, setIsOpen] = useState(props.initialOpen);
    const [ref, bounds] = useMeasure();
    const animation = useSpring({
        height: isOpen ? bounds.height : 0,
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden'
    });

    return (
        <div className="dropdown">
            <span className="dropdown-label" onClick={() => setIsOpen(!isOpen)}>
                {props.dropdownLabel}
            </span>
            <animated.div style={animation}>
                <div ref={ref}>
                    {props.dropdownContents}
                </div>
            </animated.div>
            
        </div>
    );
}

export default Dropdown;