function onClickLabel(label: HTMLElement) {
    const tree = label.nextElementSibling;
    label.classList.toggle('active');
    tree.classList.toggle('active');

    if (!tree.classList.contains('active')) {
        const activeElements = tree.querySelectorAll('.active');
        console.log(activeElements)
        activeElements.forEach((el) => el.classList.remove('active'));
    }
}

export default function() {
    window.addEventListener('click', (event) => {
        const label = (event.target as HTMLElement).closest('.label');

        if (!label) {
            return;
        }

        onClickLabel(label as HTMLElement);
    });
}