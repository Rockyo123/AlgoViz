import React from "react";

const DropdownOption = ({ val, handleClick }) => {
    
      return (
        <li 
            key={val}
            className="av-dropdown-item" 
            onClick={() => handleClick(val)}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key == "Enter"){
                    handleClick(val);
                }
            }}
        >
            {val}
        </li>
    )
}

export default DropdownOption;