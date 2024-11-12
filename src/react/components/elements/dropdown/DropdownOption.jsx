import React from "react";
/**
 * dropdown option
 * @param {string} val - value of the dropdown option
 * @param {function} handleClick - callback function to call when option clicked 
 * @returns rendered dropdown option
 */
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