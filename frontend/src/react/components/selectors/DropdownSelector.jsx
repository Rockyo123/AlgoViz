import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const DropdownSelector = ({val, setVal, options}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setVal(option);
        setIsOpen(false);
    };
    console.log('rocky debug: options: ', options)
    return (
        <div className="ag-dropdown">

            <div className="ag-dropdown-header-wrapper" onClick={toggleDropdown} style={{cursor: 'pointer'}}>
                <div className="ag-dropdown-header">
                    {val}
                </div>
                <span className={`ag-dropdown-icon ${isOpen ? 'open' : ''}`}>V</span>
            </div>

            <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 100 }}
                    exit={{ height: 0 }}
                    className='ag-dropdown-menu'
                >

                    {options.map((option, index) => (
                        <li 
                            key={index} 
                            className="ag-dropdown-item" 
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

export default DropdownSelector;
