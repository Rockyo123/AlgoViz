import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const Bar = forwardRef((props) => {
    const barHeightPercentage = parseInt((props.value / props.maxValue) * 100);
    
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
    
    const color = getColor(props.colorCode);
    return (
        <>
        {(props.started) &&
            <motion.div
                layout
                key={props.key}
                style={{
                    ...props.style,
                    height: `${barHeightPercentage}%`,
                    width: props.width,
                    display: 'inline-block'
                }}
                >
            <div className="graph-bar" style={{height: `100%`, /*width:'99%',*/ backgroundColor: color}} />
        </motion.div>
        }        
        {(!props.started) && 
            <div 
                style={{ 
                    height: `${barHeightPercentage}%`,
                    width: props.width,
                    display: 'inline-block'
                }}
            >
                <div className="graph-bar" style={{height: `100%`, /*width:'99%',*/ backgroundColor: color}} />
            </div>
        }
        </>
    )
})

export default Bar;