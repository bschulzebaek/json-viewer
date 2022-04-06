enum TreeClasses {
    TREE = 'tree',
    HEAD = 'tree__head',
    BODY = 'tree__body',
    ROW = 'tree__row',
    ROW_COLUMN = 'tree__row-column',
    EXPAND = 'tree__head-expand',
    CLOSE = 'tree__head-close',
}

function getHead(label: string, bodyData: unknown, path: string): HTMLElement {
    const isRoot = label === 'root',
          head = document.createElement('div');
    head.classList.add(TreeClasses.HEAD);

    if (!isRoot) {
        head.title = path;
    }

    label = isRoot ? '&rdca;' : `${label}:`;

    if (!label || bodyData === null) {
        return head;
    }

    if (Array.isArray(bodyData)) {
        head.innerHTML = `${label} (Array, ${bodyData.length})`;
    } else {
        head.innerHTML = `${label} (Object${Object.values(bodyData).length === 0 ? ', empty' : ''})`;
    }

    head.innerHTML += `
        <span class="${TreeClasses.EXPAND}">+</span>
        <span class="${TreeClasses.CLOSE}">-</span>
    `;

    return head;
}

function getBody(data: unknown, path: string): HTMLElement {
    const body = document.createElement('div');
    body.classList.add(TreeClasses.BODY);

    if (data === null) {
        body.innerHTML = 'null';
    } else if (Object.keys(data).length === 0) {
        body.innerHTML = Array.isArray(data) ? '[]' : '{}';
    } else {
        const sortedProps = Object.entries(data).sort((a, b) => {
            return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
        });

        for (let [key, value] of sortedProps) {
            if (typeof value === 'object' && value !== null) {
                const row = document.createElement('div');
                row.classList.add(TreeClasses.ROW);
                createTree(row, key, value, path);
                body.append(row);
            } else {
                body.innerHTML += getRow(key, value);
            }
        }
    }

    return body;
}

export default function createTree(parent: HTMLElement, name: any, bodyData: any, path = '') {
    const tree = document.createElement('div');
    tree.setAttribute('tabindex', '1')
    tree.classList.add(TreeClasses.TREE);

    if (name === 'root') {
        if (Array.isArray(bodyData)) {
            path += '[';
        }
    } else {
        if (path.endsWith('[')) {
            path += `${name}]`;
        } else {
            path += `.${name}`;
        }
    }

    if (name !== 'root' && Array.isArray(bodyData)) {
        path += '[';
    }

    tree.append(getHead(name, bodyData, path), getBody(bodyData, path));
    parent.append(tree);
}

function getRow(key: string, value: unknown): string {
    const rowValue = typeof value === 'string' ? `"${value}"` : value;

    return `
        <div class="${TreeClasses.ROW}">
            <span class="${TreeClasses.ROW_COLUMN}">${key}:</span>
            <span class="${TreeClasses.ROW_COLUMN}">${rowValue} (${typeof value})</span>
        </div>
    `;
}