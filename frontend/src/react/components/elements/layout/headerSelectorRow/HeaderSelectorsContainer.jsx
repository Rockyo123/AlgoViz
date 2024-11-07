import React from "react";
/**
 * HeaderSelectorsContainer component is used to wrap the header selector row. It handles the formatting of the component.
 * 
 * @component
 * @param {Object} props - React props.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the container.
 * 
 * @returns {JSX.Element} A div containing child elements, styled to be responsive based on the screen width.
 */const HeaderSelectorsContainer = ({ children }) => {
    return (
        <div className="responsive-header-selectors-row">
            {children}
        </div>
    )
}

export default HeaderSelectorsContainer;