import React, { forwardRef } from "react";
import { animate, motion } from "framer-motion";

/**
 * Bar component to display graph bar with dynamic height and color, animated using Framer Motion.
 * @param {Object} props - The properties passed to the component.
 * @param {number} value - The current value of the bar, used to calculate height percentage.
 * @param {number} maxValue - The maximum value, used to calculate height percentage.
 * @param {number} colorCode - Numeric code to determine the color of the bar.
 * @param {boolean} animated - Indicates whether to render the animated (motion.div) or static version of the bar.
 * @param {Object} [style] - Optional inline style for the bar container.
 * @param {string} width - The width of the bar.
 * @param {React.Ref} ref - Reference passed for potential parent component control.
 * @returns {JSX.Element} The rendered Bar component.
 */
const Bar = ({ value, maxValue, colorCode, animated, onAnimationEnd, style={}, width, barKey }) => {
    const barHeightPercentage = parseInt((value / maxValue) * 100);
    
    const getColor = (colorCode) => {
        switch(colorCode) {
            case 0:
                return 'white';
            case 1:
                return 'red';
            case 2:
                return 'green';
            case 3:
                return 'blue';
            default:
                return 'white';
        }
    };
    
    const color = getColor(colorCode);

    return (
        <>
        {(animated) &&
            <motion.div
                layout
                key={barKey}
                style={{
                    ...style,
                    height: `${barHeightPercentage}%`,
                    width: width,
                    display: 'inline-block'
                }}
            >
                <div className="graph-bar" style={{ backgroundColor: color }} />
            </motion.div>
        }        
        {(!animated) && 
            <div 
                style={{ 
                    height: `${barHeightPercentage}%`,
                    width: width,
                    display: 'inline-block'
                }}
            >
                <div className="graph-bar" style={{ backgroundColor: color }} />
            </div>
        }
        </>
    )
};

export default Bar;