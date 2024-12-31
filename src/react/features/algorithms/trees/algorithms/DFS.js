export const DepthFirstSearch = async (root, target, sendNextStep, opStateRef, checkOpStateRef) => {
    const nodeStack = [];
    nodeStack.push(root);
    while (nodeStack && nodeStack.length){
        const abort = await checkOpStateRef(opStateRef)
        if (abort) return;
        const curNode = nodeStack.pop();
        if (!(curNode && curNode.val)) continue;

        if (curNode.val === target){
            await sendNextStep(['found', curNode.id]);
            return true;
        }

        await sendNextStep(['visited', curNode.id]);

        nodeStack.push(curNode.right);
        nodeStack.push(curNode.left);
    }

    await sendNextStep(['notFound', -1]);
    return false;
}