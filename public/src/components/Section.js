import { createElement } from '../utils/dom.js';

export function Section({ title, label, description, content }) {
  const card = createElement('section', { classes: ['section-card'] });

  const header = createElement('div', { classes: ['section-header'] });
  const titleGroup = createElement('div');
  const titleEl = createElement('h2', { text: title });
  const badge = createElement('span', { classes: ['badge'], text: label });
  titleGroup.append(titleEl);
  header.append(titleGroup, badge);

  const descriptionEl = createElement('p', {
    classes: ['section-description'],
    text: description,
  });

  const contentEl = createElement('div');
  contentEl.append(...content);

  card.append(header, descriptionEl, contentEl);
  return card;
}
