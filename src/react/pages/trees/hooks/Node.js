let id = 0;

export const createRandomNode = (minVal=0, maxVal=100) => {
    const randomValue = Math.floor(Math.random() * maxVal) + minVal;
    return new Node(randomValue);
}

export default class Node {
    constructor(val, left, right) {
        this.id = id++;
        this.val = val;
        this.left = left ? left : null;
        this.right = right ? right : null;
    }

}