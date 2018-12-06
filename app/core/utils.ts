export const createRootElementIn = (targetEl: HTMLElement): HTMLElement => {
    const rootEl = document.createElement('div');
    rootEl.id = 'root';
    targetEl.appendChild(rootEl);

    return rootEl;
};
