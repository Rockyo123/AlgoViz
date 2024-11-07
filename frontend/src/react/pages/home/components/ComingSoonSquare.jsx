import React from "react";
import { AVSquare } from "../../../components/elements/layout";

/**
 * Square for home page that shows name of algoViz feature coming soon. 
 * @param {Function} title - name of upcoming feature.
 * @returns AlgoViz Coming Soon Square.
 */
const SortingPreviewSquare = (title) => {

    return (
        <AVSquare
            disabled={true}
            onClick={() => {}}
            setIsFocused={() => {}}  
        >
            <h2 className="text-disabled">
                {title}
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