import React, { useState } from "react";
import { Sleep } from "@/utils/_utils";

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
    const animationDuration = 0.1;
    let hoverUpdating = false;

    const handleIsHoveredOrFocused = (state) => {
        if (disabled || hoverUpdating) return;
        hoverUpdating = true;
        setIsHoveredOrFocused(state)
        sendToParent(state).finally(() => (hoverUpdating = false));
    }

    const sendToParent = async (state) =>{
        await Sleep((animationDuration+.4) * 1000);
        setIsFocused(state)
    } 

    return (
    <div 
        className={`av-square ${disabled ? 'disabled' : ' '} ${isHoveredOrFocused ? ' focused': ''}`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
            if (e.key === 'Enter') onClick();
        }}
        onClick={onClick}
        onMouseEnter={() => handleIsHoveredOrFocused(true)}
        onMouseLeave={() => handleIsHoveredOrFocused(false)}
        onFocus={() => handleIsHoveredOrFocused(true)}
        onBlur={() => handleIsHoveredOrFocused(false)}
    >

        {children}
    </div>
    );
}

export default AVSquare;