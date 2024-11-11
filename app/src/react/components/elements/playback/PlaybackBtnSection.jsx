import React from "react";
import { FontAwesomeBtn } from "../layout";
import { faShuffle, faBackwardStep } from "@fortawesome/free-solid-svg-icons";

/**
 * PlaybackBtnSection component renders a section with playback controls, including buttons for shuffling, resetting steps,
 * and toggling the visualization state.
 * @param {string} btnText - The text displayed on the toggle button.
 * @param {Function} randomizeGraph - Callback function invoked when the shuffle button is clicked.
 * @param {Function} resetSteps - Callback function invoked when the reset button is clicked.
 * @param {Function} toggleVizState - Callback function invoked to toggle the visualization state.
 * @returns {JSX.Element} The rendered PlaybackBtnSection component.
 */
const PlaybackBtnSection = ({ btnText, randomizeGraph, resetSteps, toggleVizState }) => {
    return(
        <div className="start-btn-row full-width centered-row">
            <div className="start-btn-col full-width centered-col">
                <div className="full-width space-between-row space-below">
                    <FontAwesomeBtn
                        icon={faShuffle}
                        onClick={() => randomizeGraph()}
                        customStyle={{flexGrow: 1, marginRight: '3%'}}
                            
                    />
                    <FontAwesomeBtn
                        icon={faBackwardStep}
                        onClick={() => resetSteps()}
                        customStyle={{flexGrow: 1, marginLeft: '3%'}}
                    />
                </div>
                <button className="primary-btn" onClick={() => toggleVizState()}>
                    {btnText}
                </button> 
            </div>
        </div>
    );
}

export default PlaybackBtnSection;