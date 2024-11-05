import React from "react";
import { FontAwesomeBtn } from "../layout";
import { faShuffle, faBackwardStep } from "@fortawesome/free-solid-svg-icons";

const PlaybackBtnSection = (props) => {
    return(
        <div className="start-btn-row full-width centered-row">
            <div className="start-btn-col full-width centered-col">
                <div className="full-width space-between-row space-below">
                    <FontAwesomeBtn
                        icon={faShuffle}
                        onClick={() => props.randomizeGraph()}
                        customStyle={{flexGrow: 1, marginRight: '3%'}}
                            
                    />
                    <FontAwesomeBtn
                        icon={faBackwardStep}
                        onClick={() => props.resetSteps()}
                        customStyle={{flexGrow: 1, marginLeft: '3%'}}
                    />
                </div>
                <button className="primary-btn" onClick={() => props.toggleGraphState()}>
                    {props.btnText}
                </button> 
            </div>
        </div>
    );
}

export default PlaybackBtnSection;