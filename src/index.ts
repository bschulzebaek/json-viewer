import createTree from './create-tree';
import matchCharacterPairs from './match-character-pairs';
import insertTab from './insert-tab';
import registerTreeLabels from './register-tree-labels';

const lsKey = 'JSON_VIEWER_LAST';

enum Selectors {
    TEXTAREA = 'textarea[name="input"]',
    TARGET = '.output__inner',
    TREE = '.tree',
    TREE_HEAD = '.tree__head',
    PLACEHOLDER = '.placeholder'
}

let debounceTimeout: ReturnType<typeof setTimeout>;

function debounce(callback: Function) {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        callback();
    }, 500);
}

function onInput(event: KeyboardEvent) {
    const eventTarget = event.target as HTMLTextAreaElement,
          newValue = eventTarget.value;

    try {
        if (newValue !== '') {
            const parsed = JSON.parse(newValue);
            outputTarget.innerHTML = '';
            placeholder.style.display = 'none';

            createTree(outputTarget, 'root', parsed);
            (document.querySelector(Selectors.TREE_HEAD) as HTMLElement).click();
        } else {
            placeholder.style.display = 'block';
            document.querySelector(Selectors.TREE)?.remove();
        }

        localStorage.setItem(lsKey, newValue);
    } catch(e) {
        outputTarget.innerHTML = e;
        placeholder.style.display = 'none';
    }
}

const textarea = document.querySelector(Selectors.TEXTAREA) as HTMLTextAreaElement,
        outputTarget = document.querySelector(Selectors.TARGET) as HTMLElement,
        placeholder = document.querySelector(Selectors.PLACEHOLDER) as HTMLElement;

textarea.focus();
textarea.addEventListener('input', (event) => {
    debounce(onInput.bind(this, event))
});
// WIP
// textarea.addEventListener('keydown', matchCharacterPairs);
textarea.addEventListener('keydown', insertTab);

registerTreeLabels();

const lastJson = localStorage.getItem(lsKey);

if (lastJson) {
    textarea.value = lastJson;
    textarea.dispatchEvent(new Event('input'));
}