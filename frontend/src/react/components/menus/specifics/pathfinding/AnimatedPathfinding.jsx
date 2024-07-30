import React, {useEffect, useState} from "react";
import { useChain, useSpring, useSpringRef, animated } from "@react-spring/web";

const AnimatedPathFinding = (props) => {
    const [isAnimated, setIsAnimated] = useState(props.isAnimated);

    useEffect(() => {
        setIsAnimated(props.isAnimated)
    }, [props.isAnimated]);

    const firstRef = useSpringRef()
    const secondRef = useSpringRef();
    const thirdRef = useSpringRef();

    const fadeIn = useSpring({
        ref: firstRef,
        opacity: props.isAnimated ? 1: 0,
        transform: props.isAnimated ? 'scale(1)' : 'scale(.1)'
    });



    useChain([firstRef, secondRef], [0, 0.5]);

    console.log('rocky debug: is animated: ', props.isAnimated)

    return (
        <div>
            <animated.div style={fadeIn}>
                <span className="pathfinding-logo-square"/>
            </animated.div>

                <span className="pathfinding-logo-square"/>
                <span className="pathfinding-logo-square"/>
                <span className="pathfinding-logo-square"/>
                <span className="pathfinding-logo-square"/>
                <span className="pathfinding-logo-square"/>
                <span className="pathfinding-logo-square"/>
                <span className="pathfinding-logo-square"/>
                <span className="pathfinding-logo-square"/>
                <span className="pathfinding-logo-square"/>
        </div>
    );
}
export default AnimatedPathFinding;