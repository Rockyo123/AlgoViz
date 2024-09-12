import React, {useState} from "react";
import { useSpring, animated } from "@react-spring/web";

const AnimatedLabel= (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const originalFontSize = props.fontSize || '16px';
    const hoveredFontSize = parseFloat(originalFontSize) * 1.2 + 'px';


    const textHighlight = useSpring({
        //transform: isHovered ? 'scale(1.2)': 'scale(1)',
        fontSize: isHovered ? hoveredFontSize: originalFontSize,
        color: isHovered ? '#ffffff': '#aeb5b4',
    })

    const startAnimation = () => {
        setIsHovered(true);
    }

    const endAnimation = () => {
            setIsHovered(false);
    }

    return (
        <div className='dropdown-label' onClick={props.onClick} onMouseEnter={startAnimation} onMouseLeave={endAnimation}>
            <span>
                {<props.animatedElement
                    isAnimated={isHovered}
                />}
            </span>
            <animated.span style={textHighlight}>
                {props.labelText}
            </animated.span>
        </div>
    );

}
export default AnimatedLabel;