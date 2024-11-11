import React, { forwardRef } from "react";
import { motion } from "framer-motion";

/**
 * Bar component to display graph bar with dynamic height and color, animated using Framer Motion.
 * @param {Object} props - The properties passed to the component.
 * @param {number} value - The current value of the bar, used to calculate height percentage.
 * @param {number} maxValue - The maximum value, used to calculate height percentage.
 * @param {number} colorCode - Numeric code to determine the color of the bar.
 * @param {boolean} started - Indicates whether to render the animated (motion.div) or static version of the bar.
 * @param {Object} [style] - Optional inline style for the bar container.
 * @param {string} width - The width of the bar.
 * @param {React.Ref} ref - Reference passed for potential parent component control.
 * @returns {JSX.Element} The rendered Bar component.
 */
const Bar = ({ value, maxValue, colorCode, started, style={}, width, key }) => {
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
        {(started) &&
            <motion.div
                layout
                key={key}
                style={{
                    ...style,
                    height: `${barHeightPercentage}%`,
                    width: width,
                    display: 'inline-block'
                }}
                >
            <div className="graph-bar" style={{height: `100%`, /*width:'99%',*/ backgroundColor: color}} />
        </motion.div>
        }        
        {(!started) && 
            <div 
                style={{ 
                    height: `${barHeightPercentage}%`,
                    width: width,
                    display: 'inline-block'
                }}
            >
                <div className="graph-bar" style={{height: `100%`, /*width:'99%',*/ backgroundColor: color}} />
            </div>
        }
        </>
    )
};

export default Bar;