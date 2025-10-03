export function createElement(tag, { classes = [], text, attrs = {}, children = [] } = {}) {
  const element = document.createElement(tag);

  if (classes.length) {
    element.classList.add(...classes);
  }

  if (text) {
    element.textContent = text;
  }

  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });

  return element;
}

export function createField({ label, control }) {
  const wrapper = createElement('div', { classes: ['field'] });
  const labelEl = createElement('label', { text: label });
  wrapper.append(labelEl, control);
  return wrapper;
}

export function createButton(label, { variant = 'primary' } = {}) {
  return createElement('button', {
    classes: ['button', `button-${variant}`],
    text: label,
    attrs: { type: 'button' },
  });
}

export function createSwitch({ active = false, label }) {
  const container = createElement('div', { classes: ['field'] });
  const labelEl = createElement('label', { text: label });
  const switchEl = createElement('div', {
    classes: ['switch'],
    attrs: { 'data-active': String(active) },
  });

  switchEl.addEventListener('click', () => {
    const newValue = switchEl.getAttribute('data-active') !== 'true';
    switchEl.setAttribute('data-active', String(newValue));
  });

  container.append(labelEl, switchEl);
  return container;
}
