const SINGLE_QUOTE = "\"";
const LPAREN = "{";
const RPAREN = "}";
const LBRACK = "[";
const RBRACK = "]";

const CHARS_REQUIRE_PAIR: Record<string, string> = {
    [SINGLE_QUOTE]: SINGLE_QUOTE,
    [LPAREN]: RPAREN,
    [LBRACK]: RBRACK
};

export default function characterPairs(event: KeyboardEvent) {
    const keyTyped = event.key,
          textarea = event.target as HTMLInputElement;

    if (!Object.keys(CHARS_REQUIRE_PAIR).includes(keyTyped)) {
        return
    }

    const caretPosition = textarea.selectionStart,
          closingChar = CHARS_REQUIRE_PAIR[keyTyped];

    textarea.value =
        textarea.value.substr(0, caretPosition) +
        closingChar +
        textarea.value.substr(caretPosition);

    textarea.setSelectionRange(caretPosition, caretPosition);
}