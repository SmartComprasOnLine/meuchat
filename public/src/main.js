import { App } from './components/App.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');
  root.appendChild(App());
});
