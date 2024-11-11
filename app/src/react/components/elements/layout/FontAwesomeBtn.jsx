import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Button component that renders an input FontAwesomeIcon. 
 * @param {Element} icon - which Font Awesome icon to display 
 * @param {Function} onClick - function to call when button clicked
 * @param {boolean} [active] - OPTIONAL. Whether or not button is active and has active styling.
 * @param {Object} [customStyle] - OPTIONAL. Custom css style object for the button.
 * @returns rendered button
 */
const FontAwesomeBtn = ({ icon, onClick, active=false, customStyle={} }) => {
    return (
            <button className={`secondary-btn ${active ? 'active' : ''}`} onClick={onClick} style={customStyle}>
                <FontAwesomeIcon icon={icon} />   
            </button> 
    );
}

export default FontAwesomeBtn;