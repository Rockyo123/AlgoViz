import React from "react";

export const Sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Utility function to calculate bounding boxes
export const calculateBoundingBoxes = (children) => {
  const boundingBoxes = {};

  React.Children.forEach(children, child => {
    // Ensure that child is a valid React element with a ref
    if (React.isValidElement(child) && child.ref && child.ref.current) {
      const domNode = child.ref.current;
      const nodeBoundingBox = domNode.getBoundingClientRect();

      boundingBoxes[child.key] = nodeBoundingBox;
    }
  });

  return boundingBoxes;
};
