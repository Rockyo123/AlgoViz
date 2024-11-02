import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const FontAwesomeBtn = ({icon, onClick, active=false, customStyle={}}) => {
    return (
            <button className={`secondary-btn ${active ? 'active' : ''}`} onClick={onClick} style={customStyle}>
                <FontAwesomeIcon icon={icon} />   
            </button> 
    );
}

export default FontAwesomeBtn;