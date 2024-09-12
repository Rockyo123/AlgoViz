import React, {useState} from "react";
import AnimatedLabel from "./basics/AnimatedLabel";
import AnimatedSortingBars from "./specifics/sorting/AnimatedSortingBars";
import AnimatedPathFinding from "./specifics/graphs/AnimatedGraphs";
import AnimatedTree from "./specifics/trees/AnimatedTree";
const LeftSideNav = (props) => {
    const [openedTab, setOpenedTab] = useState(0);
    const [hovered, setHovered] = useState(false);
    const handleLabelClick = (val) => {
        let tab = 0
        switch (val){
            case 'sorting':
                tab = 1;
                break;
            case 'trees':
                tab = 2
                break;
            case 'graphs':
                tab = 3
                break;
            default:
                tab = 0
                break;
        }
        setOpenedTab(tab);
        }
    return (
        <div className={`sidebar ${hovered ? 'active' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="col-flex">
            <AnimatedLabel 
                labelText='Sorting'
                animatedElement={AnimatedSortingBars}
                onClick={() => handleLabelClick('sorting')}
                isSelected={openedTab === 1}
            />
            <AnimatedLabel 
                labelText='Trees'
                animatedElement={AnimatedTree}
                onClick={() => handleLabelClick('trees')}
                isSelected={openedTab === 2}
            />
            <AnimatedLabel 
                labelText='Graphs'
                animatedElement={AnimatedPathFinding}
                onClick={() => handleLabelClick('graphs')}
                isSelected={openedTab === 3}
            />               
            </div>
        </div>
    );
}

export default LeftSideNav;