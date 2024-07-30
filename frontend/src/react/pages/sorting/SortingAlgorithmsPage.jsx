import React from "react";
import Graph from './components/Graph'

const SortingAlgorithmsPage = (props) => {
    return (
        <div className="algorithms-page">
            <div className="algorithms-page-header-row">
                <h2>
                    Sorting
                </h2>
            </div>
            <div className="algorithms-page-selectors-row">

            </div>
            <div className="algorithms-page-start-row">
                <button className="algorithms-page-start-btn">
                    START
                </button>
            </div>
            <Graph 
                options={{}}
            />
        </div>
    )
}

export default SortingAlgorithmsPage;