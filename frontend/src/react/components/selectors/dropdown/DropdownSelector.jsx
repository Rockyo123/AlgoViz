import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DropdownOption from './DropdownOption';

const DropdownSelector = ({val, setVal, options}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [curDispOptions, setCurDispOptions] = useState([val]);

    const toggleDropdown = () => {
        if (!isOpen) {
            setIsOpen(true);
            setCurDispOptions(options);
        }
        else{
            setIsOpen(false);
        }
    }

    const handleOptionClick = (option) => {
        setVal(option);
        setIsOpen(false);
    };

    const optionVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
      };

    return (
        <div className="av-dropdown-wrapper">
            <div 
                className="av-dropdown-header" 
                onClick={toggleDropdown} 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        toggleDropdown();
                    }
                }}
                tabIndex={0}
            >
            {val}
            <span className={`av-dropdown-icon ${isOpen ? 'open' : ''}`}>V</span>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="av-dropdown" 
                        layout="size"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={optionVariants}
                        style={{ overflow: 'hidden' }}
                    >
                    {options.map((option) => (
                        <DropdownOption 
                            val={option} 
                            handleClick={handleOptionClick}
                        />
                    ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
      );
};

export default DropdownSelector;
