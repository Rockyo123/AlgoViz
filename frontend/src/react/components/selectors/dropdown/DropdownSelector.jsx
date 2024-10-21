import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DropdownOption from './DropdownOption';

const DropdownSelector = ({val, setVal, options}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [curDispOptions, setCurDispOptions] = useState([val]);

    useEffect(() => {
        const dispOptions = isOpen ? options : [val];
        setCurDispOptions(dispOptions);
    }, [isOpen]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setVal(option);
        setIsOpen(false);
    };

    const dropdownVariants = {
        hidden: { opacity: 0, y: 0 },
        visible: (custom) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: .15,
            delay: (custom.isCurVal) ? 0 : Math.max(.15, custom.indexOfCurVal * .05),
          },
        }),
        exit: { opacity: 0, duration: .15 },
    };


    return (
        <div className="ag-dropdown">
            <div className="ag-dropdown-header-wrapper" onClick={toggleDropdown} style={{cursor: 'pointer'}}>
                <motion.div 
                    layout='size'
                    className={isOpen ? 'ag-dropdown-menu' : 'ag-dropdown-header'}
                >
                    <AnimatePresence>
                        {curDispOptions.map((option, index) => (
                            <motion.div
                                key={option}
                                custom={{ isCurval: option === val, indexOfCurVal: curDispOptions.indexOf(val)}}
                                variants={dropdownVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <DropdownOption 
                                val={option}
                                onClick={handleOptionClick}
                                />
                            </motion.div>
                        ))}  
                    </AnimatePresence>  
                </motion.div>
                <span className={`ag-dropdown-icon ${isOpen ? 'open' : ''}`}>V</span>             

            </div>
        </div>
    );
};

export default DropdownSelector;
