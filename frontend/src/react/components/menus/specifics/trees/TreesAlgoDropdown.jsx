import React, {useState} from "react";
import Dropdown from "../../basics/Dropdown";
import AnimatedTree from './AnimatedTree'
import AnimatedLabel from "../../basics/AnimatedLabel";

const SortingAlgoDropdown = (props) => {

    const label = (
        <AnimatedLabel 
            labelText='Trees'
            animatedElement={AnimatedTree}
        />
    );
    
return (
    <Dropdown 
        initialOpen={false}
        dropdownLabel={label}
        dropdownContents={
            <div className="d-flex flex-row mb-3">
                <div className="p-2">
                    Depth First Search
                </div>
                <div className="p-2">
                    Breadth First Search
                </div>
                <div className="p-2">
                    Others
                </div>
            </div>
        }
    />
)
}

export default SortingAlgoDropdown