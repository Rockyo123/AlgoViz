export const LinkedListSearch = async (head, target, sendNextStep, opStateRef, checkOpStateRef) => {
    let curNode = head;
    let idx = 0;
    while (curNode){
        const abort = await checkOpStateRef(opStateRef)
        if (abort) return;

        if (curNode.val === target){
            await sendNextStep(['found', idx]);
            return true;
        }

        await sendNextStep(['visited', idx]);

        curNode = curNode.next;
        idx++;
    }

    await sendNextStep(['notFound', -1]);
    return false;
}