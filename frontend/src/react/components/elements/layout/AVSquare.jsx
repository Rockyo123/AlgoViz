import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sleep } from "../../../utils/_utils";

const AVSquare = (props) => {
    const [isHoveredOrFocused, setIsHoveredOrFocused] = useState(false);
    const animationDuration = 0.6

    const handleIsHoveredOrFocused = (state) => {
        if (props.disabled) return;
        setIsHoveredOrFocused(state)
        sendToParent(state)
    }

    const sendToParent = async (state) =>{
        await Sleep((animationDuration+4) * 100);
        props.setIsFocused(state)
    } 

    return (
    <motion.div 
        className={`av-square ${props.disabled ? 'disabled' : ' '}`}
        animate={{
            scale: isHoveredOrFocused ? 1.08 : 1,
            transition: { duration: animationDuration },
        }}
        tabIndex={props.disabled ? -1 : 0}
        onKeyDown={(e) => {
            if (e.key === 'Enter') props.onClick();
        }}
        onClick={props.onClick}
        onMouseEnter={() => handleIsHoveredOrFocused(true) }
        onMouseLeave={() => handleIsHoveredOrFocused(false)}
        onFocus={() => handleIsHoveredOrFocused(true)}
        onBlur={() => handleIsHoveredOrFocused(false)}
    >

        {props.children}
    </motion.div>
    );
}

export default AVSquare;