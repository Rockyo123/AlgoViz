let id = 0;

export default class Node {
    constructor(val, left, right) {
        this.id = id++;
        this.val = val;
        this.left = left ? left : null;
        this.right = right ? right : null;
    }
}