export const BreadthFirstSearch = async (root, target, sendNextStep, opStateRef, checkOpStateRef) => {
    const nodeQueue = [];

    nodeQueue.push(root);
    while (nodeQueue && nodeQueue.length){
        const abort = await checkOpStateRef(opStateRef)
        if (abort) return;
        const curNode = nodeQueue.shift();
        if (!(curNode && curNode.val)) continue;

        if (curNode.val === target){
            await sendNextStep(['found', curNode.id]);
            return true;
        }

        await sendNextStep(['visited', curNode.id]);

        nodeQueue.push(curNode.left);
        nodeQueue.push(curNode.right);
    }

    await sendNextStep(['notFound', -1]);
    return false;
}