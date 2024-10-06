import React, { useLayoutEffect, useState } from "react";

/**
 * Custom hook to calculate the dimensions of a container and the number of units 
 * (grid cells) that can fit within the container, based on the container's size 
 * and the minimum unit dimensions.
 *
 * @param {React.RefObject} containerRef - A reference to the container DOM element.
 * @param {number} minUnitWidth - The minimum width of a single unit.
 * @param {number} minUnitHeight - The minimum height of a single unit.
 * @param {number} [maxXUnits] - The maximum number of units allowed along the x-axis.
 * @param {number} [maxYUnits] - The maximum number of units allowed along the y-axis.
 *
 * @returns {Object} An object containing:
 *  - containerDimensions: {width: number, height: number, left: number, top: number} - The bounding dimensions of the container.
 *  - xUnits: number - The number of units that can fit along the x-axis (horizontally).
 *  - yUnits: number - The number of units that can fit along the y-axis (vertically).
 */
export const useResponsiveGrid = (containerRef, minUnitWidth, minUnitHeight, maxXUnits, maxYUnits) => {
    //--------------------------------------------------
    const [dimensionData, setDimensionData] = useState({ 
        containerDimensions: {'height': 0, 'width': 0, 'left': 0, 'top': 0}, 
        xUnits: 0, 
        yUnits: 0 
    });

    //--------------------------------------------------
    useLayoutEffect(() => {
        const getDimensions = () => {
          const boundingBox = containerRef.current.getBoundingClientRect();
          return ({
            top: boundingBox.top,
            left: boundingBox.left,
            width: boundingBox.width,
            height: boundingBox.height,
          });
        };

        const getResponsiveUnits = (dimensions) => {
            const units = {'xUnits': 0, 'yUnits': 0}
            if (minUnitWidth > 0 && minUnitHeight > 0) {
                units['xUnits'] = Math.min(Math.floor(dimensions['width'] / minUnitWidth), maxXUnits);
                units['yUnits'] = Math.min(Math.floor(dimensions['height'] / minUnitHeight), maxYUnits);
            }
            return units;
        }
    
        const handleResize = () => {
            const containerDimensions = getDimensions();
            const units = getResponsiveUnits(containerDimensions);
            setDimensionData({
                'containerDimensions': containerDimensions,
                xUnits: units['xUnits'],
                yUnits: units['yUnits'],
            });
        }
    
        if (containerRef.current) {
            handleResize();
        }
    
        window.addEventListener("resize", handleResize)
    
        return () => {
          window.removeEventListener("resize", handleResize)
        }
    }, [containerRef, minUnitWidth, minUnitHeight, maxXUnits, maxYUnits]);

    //--------------------------------------------------
    return dimensionData;
};