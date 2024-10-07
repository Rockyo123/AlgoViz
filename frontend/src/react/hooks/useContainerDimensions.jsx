import React, { useLayoutEffect, useState } from "react";

export const useContainerDimensions = containerRef => {
    const [dimensions, setDimensions] = useState({ top: 0, left: 0, width: 0, height: 0 })
  
    useLayoutEffect(() => {
      const getDimensions = () => {
        const boundingBox = containerRef.current.getBoundingClientRect();
        console.log('rocky debug getting disp dimensions: ', boundingBox);
        return ({
          top: boundingBox.top,
          left: boundingBox.left,
          width: boundingBox.width,
          height: boundingBox.height,
        });
      };
  
      const handleResize = () => {
        setDimensions(getDimensions())
      }
  
      if (containerRef.current) {
        setDimensions(getDimensions())
      }
  
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [containerRef])
  
    return dimensions;
  };