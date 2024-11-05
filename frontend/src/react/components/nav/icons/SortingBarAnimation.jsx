import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const SortingBarAnimation = (props) => {
    const [arr, setArr] = useState([1, 2, 3]);

    const shuffleArr = () => {
        let shuffleCurArr = (arr) => {
            let shuffledArr = arr
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
            return shuffledArr;
        }
        let shuffledArr = shuffleCurArr([...arr]);
        setArr(shuffledArr);
    }

    /*useEffect(() => {
        const shuffleInterval = setInterval(shuffleArr, 1000);
        return (() => {
            clearInterval(shuffleInterval);
        });
    }, []); */

    return (
        <div className="graph-container">
            {arr.map((val, idx) => (
                <motion.div
                    layout
                    key={idx}
                    style={{
                        ...props.style,
                        height: `${(val / 3) * 100}%`,
                        width: '33%',
                        display: 'inline-block'
                    }}
                    >
                    <div className="graph-bar-nav" style={{height: `100%`}} />
                </motion.div>
            ))}
        </div>
    )
}

export default SortingBarAnimation;