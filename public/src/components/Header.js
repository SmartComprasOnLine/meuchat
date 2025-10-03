import { createElement } from '../utils/dom.js';

export function Header() {
  const container = createElement('header', { classes: ['dashboard-header'] });

  const title = createElement('h1', {
    text: 'Central de Orquestração de Agentes WhatsApp',
  });

  const subtitle = createElement('p', {
    text: 'Administre prompts, integrações, memórias e automações do seu agente único em um cockpit modular e seguro.',
  });

  container.append(title, subtitle);
  return container;
}
