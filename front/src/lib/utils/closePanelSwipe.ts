export function swipeToClose(node: HTMLElement, callback: () => void) {
    let startX = 0;
    let endX = 0;

    function handleTouchStart(event: TouchEvent) {
        if (window.innerWidth > 768) return;
        startX = event.touches[0].clientX;
    }

    function handleTouchMove(event: TouchEvent) {
        if (window.innerWidth > 768) return;
        endX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (window.innerWidth > 768) return;
        const deltaX = endX - startX;
        if (deltaX > 100) {
            callback();
        }
    }

    node.addEventListener('touchstart', handleTouchStart);
    node.addEventListener('touchmove', handleTouchMove);
    node.addEventListener('touchend', handleTouchEnd);

    return {
        destroy() {
            node.removeEventListener('touchstart', handleTouchStart);
            node.removeEventListener('touchmove', handleTouchMove);
            node.removeEventListener('touchend', handleTouchEnd);
        }
    };
}
