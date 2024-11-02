import React from "react";
import { AVSquare } from "../../../components/elements/layout";

const SortingPreviewSquare = (props) => {

    return (
        <AVSquare
            disabled={true}
            onClick={() => {}}
            setIsFocused={() => {}}  
        >
            <h2 className="text-disabled">
                {props.title}
            </h2>
            <div 
                className="preview-algoViz-wrapper"
            >
                <h2>
                Coming Soon...
                </h2>
            </div>
    </AVSquare>
    );
}

export default SortingPreviewSquare;