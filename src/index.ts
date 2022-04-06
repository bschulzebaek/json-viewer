import createTree from './create-tree';
import matchCharacterPairs from './match-character-pairs';
import insertTab from './insert-tab';
import registerTreeLabels from './register-tree-labels';

const textarea = document.querySelector('textarea[name="input"]') as HTMLInputElement,
      outputTarget = document.querySelector('.output__inner') as HTMLElement,
      placeholder = document.querySelector('.placeholder') as HTMLElement;

registerTreeLabels();
textarea.focus();

textarea.addEventListener('input', () => {
    debounce(onInput)
});

textarea.addEventListener('keydown', matchCharacterPairs);
textarea.addEventListener('keydown', insertTab);

let debounceTimeout: ReturnType<typeof setTimeout>;

function debounce(callback: Function) {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        callback();
    }, 500);
}

function onInput() {
    const newValue = textarea.value;

    try {
        const parsed = JSON.parse(newValue);
        outputTarget.innerHTML = '';
        placeholder?.remove();

        createTree(parsed, outputTarget);
    } catch(e) {
        // console.log(e)
    }
}