import React, {useState} from "react";
import Dropdown from "../../basics/Dropdown";
import AnimatedPathFinding from "./AnimatedPathfinding";
import AnimatedLabel from "../../basics/AnimatedLabel";

const PathfindingAlgoDropdown = (props) => {
    const label = (
        <AnimatedLabel 
            labelText='Pathfinding'
            animatedElement={AnimatedPathFinding}
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

export default PathfindingAlgoDropdown