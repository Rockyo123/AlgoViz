import React, {useState} from "react";
import Dropdown from "./basics/Dropdown";
import SortingAlgoDropdown from "./specifics/sorting/SortingAlgoDropdown";
import PathfindingAlgoDropdown from './specifics/pathfinding/PathfindingAlgoDropdown'
const LeftSideNav = (props) => {
    return (
        <div className="left-side-menu">
            <SortingAlgoDropdown />
            <PathfindingAlgoDropdown />
        </div>
    );
}

export default LeftSideNav;