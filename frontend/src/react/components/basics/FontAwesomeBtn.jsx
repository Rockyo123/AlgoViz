import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FontAwesomeBtn = ({icon, onClick, active=false, customStyle={}}) => {
    return (
        <button className="secondary-btn" onClick={onClick} style={customStyle}>
            <FontAwesomeIcon icon={icon} style={{color: active ? 'black' : "#ffffff"}} />   
        </button>
    );
}

export default FontAwesomeBtn;