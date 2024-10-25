import React  from "react";
import ClampedBlurInput from "./ClampedBlurInput";

/**
 * SizeSelector2d handles selecting the size of a grid in the x and y dimensions. The values are
 * clamped between a specified minimum and maximum and only changed on onBlur.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {number} props.xSize - The current size for the x dimension of the grid.
 * @param {number} props.ySize - The current size for the y dimension of the grid.
 * @param {function} props.updateXSize - A callback function to update the xSize
 * value when the input loses focus.
 * @param {function} props.updateYSize - A callback function to update the ySize
 * value when the input loses focus.
 * @param {number} props.min - The minimum allowed size for both dimensions.
 * @param {number} props.max - The maximum allowed size for both dimensions.
 *
 * @returns {JSX.Element} The rendered grid size selector with two input fields.
 */
const SizeSelector2D = (props) => {

    return (
        <div className="row-flex">
            <ClampedBlurInput
                val={props.xSize}
                updateVal={props.updateXSize}
                min={props.min}
                max={props.max}
                style={{ flex: 1, marginRight: '5px', maxWidth: '50%' }}
            />
            x
            <ClampedBlurInput
                val={props.ySize}
                updateVal={props.updateYSize}
                min={props.min}
                max={props.max}
                style={{ flex: 1, marginRight: '5px', marginLeft: '5px', maxWidth: '50%' }}
            />
        </div>
        )


}

export default SizeSelector2D;