export default function createTree(obj: object, target: HTMLElement) {
    const sortedProps = Object.entries(obj).sort();

    for (let [key, value] of sortedProps) {
        if (typeof value === 'object') {
            target.innerHTML += `<div class="label">
                ${key} (${Array.isArray(value) ? `Array, ${value.length}` : 'Object'})
                <span class="state--closed">[+]</span>
                <span class="state--opened">[-]</span>
            </div>`;
            target.innerHTML += `<div class="tree"></div>`;

            createTree(value, target.lastElementChild as HTMLElement);
        } else {
            target.innerHTML += getRow(key, value);
        }
    }
}

function getRow(key: string, value: string | number): string {
    switch (typeof value) {
        case 'string':
            return `<div><span>${key}:</span><span>"${value}"</span></div>`;
        case 'number':
        default:
            return `<div><span>${key}:</span><span>${value}</span></div>`;
    }
}