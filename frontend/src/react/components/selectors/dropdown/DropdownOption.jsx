import React from "react";
import { isPresent, motion, useIsPresent } from "framer-motion";

const DropdownOption = ({ val, onClick }) => {
    const isPresent = useIsPresent();
    
      return (
        <li 
            key={val}
            className="ag-dropdown-item" 
            onClick={() => onClick(val)}
        >
            {val}
        </li>
    )
}

export default DropdownOption;