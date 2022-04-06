function onClickHead(head: HTMLElement) {
    const tree = head.parentElement,
          body = head.nextElementSibling;

    tree.classList.toggle('tree--expand');
}

export default function() {
    window.addEventListener('click', (event) => {
        const head = (event.target as HTMLElement).closest('.tree__head');

        if (!head) {
            return;
        }

        onClickHead(head as HTMLElement);
    });
}