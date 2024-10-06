import React from "react";

const HeaderSelector = ({label, selector}) => {
    return (
        <div className="full-width centered-row">
            <div className="full-width centered-col">
                <div className="text-white">
                    {label}
                </div>
                {selector}
            </div>
        </div>
    )
}

export default HeaderSelector;