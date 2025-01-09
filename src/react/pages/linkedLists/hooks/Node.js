let id = 0;

export const createRandomNode = (minVal=0, maxVal=100) => {
    const randomValue = Math.floor(Math.random() * maxVal) + minVal;
    return new Node(randomValue);
}

export default class Node {
    constructor(val, next) {
        this.id = id++;
        this.val = val;
        this.next = next ? next : null;
        this.color = 'white'
    }

}