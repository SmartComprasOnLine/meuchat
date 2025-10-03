import { Header } from './Header.js';
import { Section } from './Section.js';
import {
  createElement,
  createField,
  createButton,
  createSwitch,
} from '../utils/dom.js';

function promptCentralSection() {
  const promptField = createField({
    label: 'Prompt Base',
    control: createElement('textarea', {
      attrs: {
        placeholder:
          'Defina persona, objetivos, limites e voz do agente. Este prompt será usado como base para todas as respostas.',
      },
    }),
  });

  const buttonGroup = createElement('div', { classes: ['button-row'] });
  const enhanceBtn = createButton('Aprimorar Prompt', { variant: 'primary' });
  enhanceBtn.dataset.action = 'enhance-prompt';
  const beforeAfter = createButton('Ver Antes/Depois', { variant: 'secondary' });
  beforeAfter.dataset.action = 'toggle-prompt-diff';
  buttonGroup.append(enhanceBtn, beforeAfter);

  return Section({
    title: 'Prompt Central',
    label: 'Núcleo',
    description:
      'Defina as instruções oficiais do agente: persona, objetivos, limites e protocolos para manter consistência em todas as respostas.',
    content: [promptField, buttonGroup],
  });
}

function providerSection() {
  const apiKeyField = createField({
    label: 'API Key',
    control: createElement('input', {
      attrs: {
        type: 'password',
        placeholder: 'sk-...'
      },
    }),
  });

  const modelField = createField({
    label: 'Modelo',
    control: createElement('select', {
      children: [
        createElement('option', { text: 'gpt-4o-mini', attrs: { value: 'gpt-4o-mini' } }),
        createElement('option', { text: 'gpt-4.1', attrs: { value: 'gpt-4.1' } }),
        createElement('option', { text: 'claude-3.5-sonnet', attrs: { value: 'claude-3.5-sonnet' } }),
        createElement('option', { text: 'gemini-1.5-pro', attrs: { value: 'gemini-1.5-pro' } }),
      ],
    }),
  });

  const temperatureField = createField({
    label: 'Temperatura',
    control: createElement('input', {
      attrs: { type: 'number', step: '0.1', min: '0', max: '2', value: '0.7' },
    }),
  });

  const maxTokensField = createField({
    label: 'Máximo de Tokens',
    control: createElement('input', {
      attrs: { type: 'number', min: '64', max: '4096', value: '1024' },
    }),
  });

  const testBtn = createButton('Testar conexão', { variant: 'primary' });
  testBtn.dataset.action = 'test-provider';

  return Section({
    title: 'Provedor de IA',
    label: 'Motor',
    description:
      'Selecione o provedor, configure o modelo e valide a conectividade para garantir respostas confiáveis.',
    content: [apiKeyField, modelField, temperatureField, maxTokensField, testBtn],
  });
}

function memorySection() {
  const windowField = createField({
    label: 'Tamanho da Janela (N últimas mensagens)',
    control: createElement('input', {
      attrs: { type: 'number', min: '0', max: '100', value: '20' },
    }),
  });

  const buttons = createElement('div', { classes: ['button-row'] });
  const resetGlobal = createButton('Resetar memória geral', { variant: 'secondary' });
  resetGlobal.dataset.action = 'reset-memory-global';
  const resetContact = createButton('Resetar memória por contato', { variant: 'ghost' });
  resetContact.dataset.action = 'reset-memory-contact';
  buttons.append(resetGlobal, resetContact);

  return Section({
    title: 'Memória da Conversa',
    label: 'Contexto',
    description:
      'Defina quanto do histórico recente deve ser considerado e gerencie resets pontuais ou completos da memória do agente.',
    content: [windowField, buttons],
  });
}

function timingsSection() {
  const typingSwitch = createSwitch({ label: 'Simular digitando…', active: true });
  const delayField = createField({
    label: 'Atraso antes de responder (ms)',
    control: createElement('input', {
      attrs: { type: 'number', min: '0', value: '1200' },
    }),
  });
  const waitField = createField({
    label: 'Espera para captar mensagens sequenciais (ms)',
    control: createElement('input', {
      attrs: { type: 'number', min: '0', value: '800' },
    }),
  });
  const blockSizeField = createField({
    label: 'Tamanho do bloco (caracteres)',
    control: createElement('input', {
      attrs: { type: 'number', min: '50', value: '480' },
    }),
  });
  const pauseField = createField({
    label: 'Pausa entre blocos (ms)',
    control: createElement('input', {
      attrs: { type: 'number', min: '0', value: '1000' },
    }),
  });
  const maxBlocksField = createField({
    label: 'Máximo de blocos',
    control: createElement('input', {
      attrs: { type: 'number', min: '1', value: '4' },
    }),
  });

  return Section({
    title: 'Timings & Respostas em Blocos',
    label: 'Humanização',
    description:
      'Controle o ritmo das respostas para humanizar a experiência, ajustando delays e formatos em blocos.',
    content: [typingSwitch, delayField, waitField, blockSizeField, pauseField, maxBlocksField],
  });
}

function whatsappSection() {
  const urlField = createField({
    label: 'URL Evolution',
    control: createElement('input', {
      attrs: { type: 'url', placeholder: 'https://api.evolution.com/v1' },
    }),
  });
  const apiKeyField = createField({
    label: 'API Key Evolution',
    control: createElement('input', {
      attrs: { type: 'password', placeholder: 'ev-...' },
    }),
  });

  const qrButton = createButton('Exibir QR Code', { variant: 'primary' });
  qrButton.dataset.action = 'show-qr';
  const statusBadge = createElement('div', {
    classes: ['tab-bar'],
    children: [
      createElement('button', {
        text: 'Online',
        attrs: { 'data-active': 'true' },
      }),
      createElement('button', {
        text: 'Aguardando',
        attrs: { 'data-active': 'false' },
      }),
    ],
  });

  const actions = createElement('div', { classes: ['button-row'] });
  const reconnectBtn = createButton('Reconectar', { variant: 'secondary' });
  reconnectBtn.dataset.action = 'reconnect-whatsapp';
  const repairBtn = createButton('Reparear', { variant: 'ghost' });
  repairBtn.dataset.action = 'repair-whatsapp';
  actions.append(reconnectBtn, repairBtn);

  return Section({
    title: 'Integração WhatsApp (QR Code)',
    label: 'Conectividade',
    description:
      'Gerencie a conexão com o WhatsApp através da API Evolution, monitore o status e acione reconexões rápidas.',
    content: [urlField, apiKeyField, qrButton, statusBadge, actions],
  });
}

function accessRulesSection() {
  const allowedField = createField({
    label: 'Lista de números permitidos',
    control: createElement('textarea', {
      attrs: {
        placeholder: '+55 11 99999-9999\n+351 21 000 0000',
      },
    }),
  });

  const blockedField = createField({
    label: 'Lista de números bloqueados',
    control: createElement('textarea', {
      attrs: {
        placeholder: '+55 21 88888-8888',
      },
    }),
  });

  const patternField = createField({
    label: 'Padrões por DDD/país',
    control: createElement('input', {
      attrs: { placeholder: '+55*, +351*' },
    }),
  });

  return Section({
    title: 'Regras de Acesso',
    label: 'Segurança',
    description:
      'Defina whitelists e blacklists para controlar quem pode interagir com o agente e impor restrições por região.',
    content: [allowedField, blockedField, patternField],
  });
}

function handoffSection() {
  const keywordsField = createField({
    label: 'Palavras-chave/intenções de handoff',
    control: createElement('textarea', {
      attrs: {
        placeholder: 'falar com humano; atendimento; suporte urgente',
      },
    }),
  });

  const destinationField = createField({
    label: 'Número(s) de destino',
    control: createElement('input', {
      attrs: { placeholder: '+55 11 90000-0000, +55 21 98888-8888' },
    }),
  });

  const templateField = createField({
    label: 'Mensagem de notificação ao atendente',
    control: createElement('textarea', {
      attrs: {
        placeholder:
          'Olá {nome}, o lead {nome} ({telefone}) solicitou atendimento humano. Última mensagem: "{última_mensagem}"',
      },
    }),
  });

  return Section({
    title: 'Handoff para Atendente',
    label: 'Escalonamento',
    description:
      'Configure quando o agente deve acionar um humano, incluindo mensagem contextualizada e múltiplos destinos.',
    content: [keywordsField, destinationField, templateField],
  });
}

function specialistSection() {
  const toggle = createSwitch({ label: 'Ativar consulta ao especialista', active: true });

  const numberField = createField({
    label: 'Número do mentor/especialista',
    control: createElement('input', {
      attrs: { placeholder: '+55 11 97777-7777' },
    }),
  });

  const timeoutField = createField({
    label: 'Timeout (segundos)',
    control: createElement('input', {
      attrs: { type: 'number', min: '10', value: '120' },
    }),
  });

  const topicsField = createField({
    label: 'Tópicos sensíveis',
    control: createElement('textarea', {
      attrs: {
        placeholder: 'saúde; finanças; dados pessoais',
      },
    }),
  });

  const timeoutMessageField = createField({
    label: 'Mensagem após timeout',
    control: createElement('textarea', {
      attrs: {
        placeholder: 'Não consegui contato com nosso especialista. Deseja que eu continue tentando ou prefira falar com um atendente humano?',
      },
    }),
  });

  return Section({
    title: 'Consultar Especialista',
    label: 'Conhecimento',
    description:
      'Quando a informação estiver ausente ou for sensível, encaminhe para um mentor e aprenda com a resposta em formato Q&A.',
    content: [toggle, numberField, timeoutField, topicsField, timeoutMessageField],
  });
}

function automationFunnelsSection() {
  const nameField = createField({
    label: 'Nome da automação',
    control: createElement('input', {
      attrs: { placeholder: 'Onboarding premium' },
    }),
  });

  const promptField = createField({
    label: 'Prompt contextual (quando acionar)',
    control: createElement('textarea', {
      attrs: {
        placeholder: 'Acionar quando o usuário demonstrar interesse em planos empresariais ou mencionar "treinamento".',
      },
    }),
  });

  const similarityField = createField({
    label: 'Similaridade mínima (%)',
    control: createElement('input', {
      attrs: { type: 'number', min: '0', max: '100', value: '65' },
    }),
  });

  const doNotRepeatLead = createSwitch({ label: 'Não repetir para o mesmo lead', active: true });

  const doNotRepeatDays = createField({
    label: 'Não repetir por X dias',
    control: createElement('input', {
      attrs: { type: 'number', min: '0', value: '7' },
    }),
  });

  const defaultDelay = createField({
    label: 'Delay padrão entre ações (s)',
    control: createElement('input', {
      attrs: { type: 'number', min: '0', value: '60' },
    }),
  });

  const stepsBuilder = createElement('div', { classes: ['list'] });
  const stepItems = [
    {
      label: 'Passo 1 - Texto',
      detail: 'Mensagem de boas-vindas com proposta de valor',
    },
    {
      label: 'Passo 2 - Condição',
      detail: 'Se usuário responder “quero saber mais” → enviar funil consultivo',
    },
    {
      label: 'Passo 3 - Pausa',
      detail: 'Aguardar 3600s antes da próxima ação',
    },
  ];

  stepItems.forEach(({ label, detail }) => {
    const item = createElement('div', {
      classes: ['list-item'],
      children: [
        createElement('span', { text: label }),
        createElement('small', { text: detail }),
      ],
    });
    stepsBuilder.appendChild(item);
  });

  const decisionInfo = createElement('p', {
    classes: ['section-description'],
    text: 'Decisor automático: avalia sensibilidade e similaridade para escolher entre Funil, Consultar Especialista ou resposta direta da IA.',
  });

  return Section({
    title: 'Funis de Automação',
    label: 'Sequências',
    description:
      'Crie sequências guiadas com múltiplos formatos, regras condicionais e controle de repetição para diferentes contextos.',
    content: [
      nameField,
      promptField,
      similarityField,
      doNotRepeatLead,
      doNotRepeatDays,
      defaultDelay,
      stepsBuilder,
      decisionInfo,
    ],
  });
}

function followUpsSection() {
  const timesField = createField({
    label: 'Tempos em minutos',
    control: createElement('input', {
      attrs: { placeholder: '60, 1440, 4320' },
    }),
  });

  const messagesField = createField({
    label: 'Mensagens por etapa',
    control: createElement('textarea', {
      attrs: {
        placeholder:
          '1º lembrete: Como posso ajudar?\n2º lembrete: Ainda posso auxiliar?\n3º lembrete: Encerrando atendimento, responda para retomar.',
      },
    }),
  });

  const attemptsField = createField({
    label: 'Limite de tentativas',
    control: createElement('input', {
      attrs: { type: 'number', min: '1', value: '3' },
    }),
  });

  const stopOnReplySwitch = createSwitch({ label: 'Parar ao responder', active: true });

  return Section({
    title: 'Follow-ups Automáticos',
    label: 'Reengajamento',
    description:
      'Retome conversas paradas com lembretes escalonados e interrompa automaticamente ao detectar resposta do usuário.',
    content: [timesField, messagesField, attemptsField, stopOnReplySwitch],
  });
}

function mediaLibrarySection() {
  const uploadField = createField({
    label: 'Upload de mídia',
    control: createElement('input', {
      attrs: { type: 'file', multiple: 'true' },
    }),
  });

  const mediaList = createElement('div', { classes: ['list'] });
  const sampleMedia = [
    { title: 'Catálogo Premium.pdf', type: 'Documento', tags: '#catálogo #pdf' },
    { title: 'Demo Produto.mp4', type: 'Vídeo', tags: '#demo #produto' },
    { title: 'Pitch Áudio.wav', type: 'Áudio', tags: '#audio #pitch' },
  ];

  sampleMedia.forEach(({ title, type, tags }) => {
    const item = createElement('div', {
      classes: ['list-item'],
      children: [
        createElement('span', { text: title }),
        createElement('small', { text: `${type} • ${tags}` }),
      ],
    });
    mediaList.appendChild(item);
  });

  const actions = createElement('div', { classes: ['button-row'] });
  const renameBtn = createButton('Renomear', { variant: 'secondary' });
  renameBtn.dataset.action = 'rename-media';
  const copyRefBtn = createButton('Copiar referência', { variant: 'ghost' });
  copyRefBtn.dataset.action = 'copy-media-ref';
  actions.append(renameBtn, copyRefBtn);

  return Section({
    title: 'Biblioteca de Mídias',
    label: 'Assets',
    description:
      'Gerencie todos os arquivos utilizados nas interações do agente e organize-os com tags e metadados.',
    content: [uploadField, mediaList, actions],
  });
}

export function App() {
  const container = createElement('div', { classes: ['dashboard'] });
  const header = Header();

  const grid = createElement('div', { classes: ['grid'] });
  const sections = [
    promptCentralSection(),
    providerSection(),
    memorySection(),
    timingsSection(),
    whatsappSection(),
    accessRulesSection(),
    handoffSection(),
    specialistSection(),
    automationFunnelsSection(),
    followUpsSection(),
    mediaLibrarySection(),
  ];

  grid.append(...sections);
  container.append(header, grid);
  return container;
}
