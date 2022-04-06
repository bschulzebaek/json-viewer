export default function(event: KeyboardEvent) {
    if (event.key !== 'Tab') {
        return;
    }

    const textarea = event.target as HTMLTextAreaElement;

    event.preventDefault();
    textarea.setRangeText(
        '    ',
        textarea.selectionStart,
        textarea.selectionStart,
        'end'
    );
}