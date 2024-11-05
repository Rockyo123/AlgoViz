import React, { useState } from 'react';
const NavIconWithAnimation = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    const AnimationComponent = props.animationComponent;
    return (
        <div 
            className='row-flex'
            onMouseEnter={() => setIsFocused(true) }
            onMouseLeave={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            <div className='nav-animation-container'>
                <AnimationComponent
                    isAnimated = {isFocused}
                />
            </div>
            {props.title}
        </div>
    )
}

export default NavIconWithAnimation;