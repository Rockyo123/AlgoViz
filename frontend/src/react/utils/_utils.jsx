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

export const getDelay = (baseDelay, speed, numEntries, minDelay=1, maxDelay=1000) => {
  let adjustedDelay = baseDelay / (speed * Math.log(numEntries + 1));
  adjustedDelay = Math.max(minDelay, Math.min(adjustedDelay, maxDelay));
  return adjustedDelay;
};