import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sleep } from "../../../utils/_utils";

/**
 * Renders children inside of AV Square. Allows for the square to be clicked / focused, and to be disabled.
 * @param {Element} children - jsx to be rendered within the AVsquare
 * @param {Function} onClick - click handler callback function
 * @param {Function} setIsFocused - focused handler callback function
 * @param {boolean} disabled - Is AVSquare disabled? Will disable onClick and setIsFocused 
 * @returns rendered AVSquare component
 */
const AVSquare = ({ children, onClick, disabled, setIsFocused }) => {
    const [isHoveredOrFocused, setIsHoveredOrFocused] = useState(false);
    const animationDuration = 0.6

    const handleIsHoveredOrFocused = (state) => {
        if (disabled) return;
        setIsHoveredOrFocused(state)
        sendToParent(state)
    }

    const sendToParent = async (state) =>{
        await Sleep((animationDuration+4) * 100);
        setIsFocused(state)
    } 

    return (
    <motion.div 
        className={`av-square ${disabled ? 'disabled' : ' '}`}
        animate={{
            scale: isHoveredOrFocused ? 1.08 : 1,
            transition: { duration: animationDuration },
        }}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
            if (e.key === 'Enter') onClick();
        }}
        onClick={onClick}
        onMouseEnter={() => handleIsHoveredOrFocused(true) }
        onMouseLeave={() => handleIsHoveredOrFocused(false)}
        onFocus={() => handleIsHoveredOrFocused(true)}
        onBlur={() => handleIsHoveredOrFocused(false)}
    >

        {children}
    </motion.div>
    );
}

export default AVSquare;