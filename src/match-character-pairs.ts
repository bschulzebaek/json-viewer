const SINGLE_QUOTE = '"';
const LPAREN = '{';
const RPAREN = '}';
const LBRACK = '[';
const RBRACK = ']';

const CHARS_REQUIRE_PAIR: Record<string, string> = {
    [SINGLE_QUOTE]: SINGLE_QUOTE,
    [LPAREN]: RPAREN,
    [LBRACK]: RBRACK
};

export default function characterPairs(event: KeyboardEvent) {
    const keyTyped = event.key,
          textarea = event.target as HTMLTextAreaElement;

    if (!Object.keys(CHARS_REQUIRE_PAIR).includes(keyTyped)) {
        return
    }

    const startPosition = textarea.selectionStart,
          endPosition = textarea.selectionEnd,
          closingChar = CHARS_REQUIRE_PAIR[keyTyped];

    textarea.value =
        textarea.value.substring(0, startPosition) +
        closingChar +
        textarea.value.substring(endPosition);

    textarea.setSelectionRange(startPosition, endPosition);
}