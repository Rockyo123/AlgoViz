import Node, { createRandomNode }  from "./hooks/Node"

export const createLinkedList = (length) => {
    let i = 1;
    const head = new Node(i);
    let curNode = head;
    while (i <= length) {
        const nextNode = new Node(i+1);
        curNode.next = nextNode;
        curNode = nextNode;
        i++;
    }
    return head;
}

export const deepCopyLinkedList = (head) => {
    if (!head) return null;
    const copiedListHead = new Node(head.val);
    copiedListHead.id = head.id
    let curCopiedNode = copiedListHead;
    let curNode = head;
    curNode = curNode.next;
    while (curNode){
        let nextCopiedNode = new Node(curNode.val);
        nextCopiedNode.id = curNode.id;

        curCopiedNode.next = nextCopiedNode;
        curCopiedNode = nextCopiedNode
        curNode = curNode.next;
    }
    return copiedListHead;
}

export const createLinkedListArr = (head) => {
    const arr = [];
    let curNode = head;
    while (curNode){
        arr.push({
            id: curNode.id,
            val: curNode.val,
            color: curNode.color,
        });
        curNode = curNode.next;
    }
    return arr;
}

export const getListLength = (head) => {
    let length = 0;
    let curNode = head;
    while (curNode) {
        length++;
        curNode = curNode.next;
    }
    return length;
}