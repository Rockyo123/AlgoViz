import React from "react";

/**
 * Renders a header selector component with label and selector.
 * @param {String} label - label of the header selector
 * @param {Element} selector - body of the header selector component.
 * @returns rendered header selector component.
 */
const HeaderSelector = ({ label, selector }) => {
    return (
        <div className="full-width centered-row">
            <div className="full-width centered-col">
                <div className="text-white">
                    {label}
                </div>
                <div className="header-selector-wrapper">
                    {selector}
                </div>        
            </div>
        </div>
    )
}

export default HeaderSelector;