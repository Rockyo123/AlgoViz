export const Sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getDelay = (baseDelay, speed, numEntries, minDelay=1, maxDelay=1000) => {
  let adjustedDelay = baseDelay / (speed * Math.log(numEntries + 1));
  adjustedDelay = Math.max(minDelay, Math.min(adjustedDelay, maxDelay));
  return adjustedDelay;
};