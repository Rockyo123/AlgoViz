import React, {useState} from "react";
import Dropdown from "../../basics/Dropdown";
import AnimatedGraphs from "./AnimatedGraphs";
import AnimatedLabel from "../../basics/AnimatedLabel";

const GraphsAlgoDropdown = (props) => {
    const label = (
        <AnimatedLabel 
            labelText='Graphs'
            animatedElement={AnimatedGraphs}
        />
    );
return (
    <Dropdown 
        initialOpen={false}
        dropdownLabel={label}
        dropdownContents={
            <div className="d-flex flex-row mb-3">
                <div className="p-2">
                    Djikstra's
                </div>
                <div className="p-2">
                    A*
                </div>
                <div className="p-2">
                    Bubble Sort
                </div>
            </div>
        }
    />
)
}

export default GraphsAlgoDropdown