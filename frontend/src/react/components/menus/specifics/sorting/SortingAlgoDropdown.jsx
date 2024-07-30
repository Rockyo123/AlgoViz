import React, {useState} from "react";
import Dropdown from "../../basics/Dropdown";
import AnimatedSortingBars from './AnimatedSortingBars'
import AnimatedLabel from "../../basics/AnimatedLabel";
const SortingAlgoDropdown = (props) => {

    const label = (
        <AnimatedLabel 
            labelText='Sorting'
            animatedElement={AnimatedSortingBars}
        />
    );
    
return (
    <Dropdown 
        initialOpen={false}
        dropdownLabel={label}
        dropdownContents={
            <div className="d-flex flex-row mb-3">
                <div className="p-2">
                    Selection Sort
                </div>
                <div className="p-2">
                    Merge Sort
                </div>
                <div className="p-2">
                    Bubble Sort
                </div>
            </div>
        }
    />
)
}

export default SortingAlgoDropdown