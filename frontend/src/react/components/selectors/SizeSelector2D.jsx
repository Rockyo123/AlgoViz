import React  from "react";
import ClampedBlurInput from "./ClampedBlurInput";

/**
 * SizeSelector2d handles selecting the size of a grid in the x and y dimensions. The values are
 * clamped between a specified minimum and maximum and only changed on onBlur.
 *
 * @component
 * @param {number} xSize - The current size for the x dimension of the grid.
 * @param {number} ySize - The current size for the y dimension of the grid.
 * @param {function} updateXSize - A callback function to update the xSize
 * value when the input loses focus.
 * @param {function} updateYSize - A callback function to update the ySize
 * value when the input loses focus.
 * @param {number} min - The minimum allowed size for both dimensions.
 * @param {number} max - The maximum allowed size for both dimensions.
 *
 * @returns {JSX.Element} The rendered grid size selector with two input fields.
 */
const SizeSelector2D = ({ xSize, ySize, updateXSize, updateYSize, min, max }) => {

    return (
        <div className="row-flex">
            <ClampedBlurInput
                val={xSize}
                updateVal={updateXSize}
                min={min}
                max={max}
                style={{ flex: 1, marginRight: '5px', maxWidth: '50%' }}
            />
            x
            <ClampedBlurInput
                val={ySize}
                updateVal={updateYSize}
                min={min}
                max={max}
                style={{ flex: 1, marginRight: '5px', marginLeft: '5px', maxWidth: '50%' }}
            />
        </div>
        )


}

export default SizeSelector2D;