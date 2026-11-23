const projects = [
  {
    id: 'sicadpro',
    title: 'SICADPRO � Web + Mobile',
    type: 'professional',
    categories: ['systems', 'mobile'],
    tags: ['Java', 'Android', 'C#', 'REST', 'Oracle'],
    description: 'Ecossistema corporativo para fiscaliza��o e servi�os de campo, com aplica��o Android, m�dulo desktop, checklists, formul�rios, anexos, relat�rios e sincroniza��o.',
    contribution: 'Desenvolvimento e evolu��o de funcionalidades para aplica��es corporativas usadas em opera��es reais, conectando fluxos mobile, desktop e servi�os.',
    context: 'Solu��o de gest�o e fiscaliza��o de energia que apoia equipes em campo e a opera��o administrativa.',
    focus: 'Aplica��es conectadas, regras de neg�cio, anexos, relat�rios e sincroniza��o.',
    status: 'Sistema corporativo',
    images: ['assets/images/SicadPro/screenshot-01.png', 'assets/images/SicadPro/screenshot-02.png'],
    links: [],
    district: 'operations',
    world: [-20, -14],
    featured: true
  },
  {
    id: 'dashboards',
    title: 'Dashboards & Opera��o',
    type: 'professional',
    categories: ['systems', 'web', 'tools'],
    tags: ['PHP', 'Laravel', 'Symfony', 'MySQL'],
    description: 'Interfaces administrativas com filtros dependentes, gr�ficos, indicadores, hist�rico, permiss�es e consultas para acompanhamento operacional.',
    contribution: 'Implementa��o e manuten��o de m�dulos administrativos e recursos de consulta para apoiar processos de opera��o.',
    context: 'Pain�is que organizam indicadores e registros usados no acompanhamento de atividades.',
    focus: 'Filtros, visualiza��o de dados, hist�rico e consultas SQL.',
    images: ['assets/images/Dashboards/screenshot-01.png', 'assets/images/Dashboards/screenshot-02.png'],
    links: [],
    district: 'operations',
    world: [-15, -17],
    featured: true
  },
  {
    id: 'inspections',
    title: 'Gerenciador de Inspe��es',
    type: 'professional',
    categories: ['systems', 'web', 'tools'],
    tags: ['Web', 'Formul�rios', 'Dashboards'],
    description: 'Plataforma de formul�rios personalizados para criar perguntas, associar usu�rios, registrar respostas e acompanhar dados e gr�ficos.',
    contribution: 'Desenvolvimento e evolu��o de fluxos de formul�rios e recursos para acompanhar as respostas registradas.',
    context: 'Ferramenta para estruturar inspe��es e transformar respostas em informa��o acompanh�vel.',
    focus: 'Configura��o de formul�rios, respostas e visualiza��o de dados.',
    images: ['assets/images/GerenciadorInspecoes/screenshot-01.png', 'assets/images/GerenciadorInspecoes/screenshot-02.png', 'assets/images/GerenciadorInspecoes/screenshot-03.png'],
    links: [],
    district: 'operations',
    world: [-15, -11],
    featured: true
  },
  {
    id: 'five-floppas',
    title: 'Five Floppas at Night',
    type: 'personal',
    categories: ['games', 'web'],
    tags: ['Web Game', 'JavaScript', 'Em desenvolvimento'],
    description: 'Jogo de sobreviv�ncia inspirado em FNAF: atravesse cinco noites enfrentando Floppas com comportamentos e mec�nicas pr�prias.',
    contribution: 'Projeto autoral em desenvolvimento, com foco em mec�nicas de jogo, progress�o e atmosfera.',
    context: 'Experi�ncia de suspense jog�vel direto no navegador.',
    focus: 'Gameplay, progress�o e prototipa��o.',
    status: 'Em desenvolvimento',
    images: ['assets/images/FiveFloppasAtNight/screenshot-01.png', 'assets/images/FiveFloppasAtNight/screenshot-02.png'],
    links: [{ label: 'Ver no itch.io', url: 'https://ganest11.itch.io/five-floppas-at-night' }],
    district: 'arcade',
    world: [-5, 14]
  },
  {
    id: 'screenshare',
    title: 'ScreenShare',
    type: 'personal',
    categories: ['web', 'tools'],
    tags: ['Web', 'Tempo real', 'Full Stack'],
    description: 'Sistema web de chat e compartilhamento de tela entre amigos, com salas, usu�rios, transmiss�es, controles e comunica��o em tempo real.',
    contribution: 'Constru��o de uma experi�ncia web que combina comunica��o e compartilhamento de tela em salas.',
    context: 'Ferramenta pessoal para aproximar conversa e transmiss�o em um s� lugar.',
    focus: 'Salas, usu�rios, transmiss�o e comunica��o em tempo real.',
    images: ['assets/images/ScreenShare/screenshot-01.png', 'assets/images/ScreenShare/screenshot-02.png'],
    links: [],
    district: 'tools',
    world: [14, -15]
  },
  {
    id: 'rpg-ai',
    title: 'RPG Web Game � AI Master',
    type: 'personal',
    categories: ['games', 'web', 'tools'],
    tags: ['Web Game', 'IA', 'Integra��o LLM'],
    description: 'Jogo web de campanhas de RPG em que a intelig�ncia artificial atua como mestre, guiando personagens, di�logos, eventos, imagens e batalhas.',
    contribution: 'Projeto autoral que explora como integrar gera��o de conte�do a uma experi�ncia de jogo.',
    context: 'Campanhas de RPG em que a narrativa se adapta �s a��es de quem joga.',
    focus: 'Narrativa, eventos, imagens e integra��o de modelos de linguagem.',
    images: ['assets/images/RPGWebGame/screenshot-01.png', 'assets/images/RPGWebGame/screenshot-02.png', 'assets/images/RPGWebGame/screenshot-03.png'],
    links: [],
    district: 'arcade',
    world: [0, 15]
  },
  {
    id: 'dopamine',
    title: 'Simulador Dopamina',
    type: 'personal',
    categories: ['games', 'web'],
    tags: ['Web Game', 'JavaScript', 'Cr�tica social'],
    description: 'Jogo e cr�tica social sobre excesso de est�mulos: sobreviva enquanto v�rias atividades disputam sua aten��o.',
    contribution: 'Cria��o de uma experi�ncia interativa que transforma o tema em mec�nica de jogo.',
    context: 'Um jogo curto sobre disputa por aten��o e excesso de est�mulos.',
    focus: 'Intera��o, ritmo e comunica��o por meio de mec�nicas.',
    images: ['assets/images/SimuladorDopamina/screenshot-01.png'],
    links: [],
    district: 'arcade',
    world: [5, 14]
  },
  {
    id: 'alisa-floppa',
    title: 'Alisa Meu Pelo � Floppa',
    type: 'personal',
    categories: ['games', 'web'],
    tags: ['Web Game', 'Publicado'],
    description: 'Jogo web publicado no itch.io: alise o Floppa o m�ximo poss�vel.',
    contribution: 'Cria��o e publica��o de um jogo casual de navegador.',
    context: 'Uma experi�ncia curta e bem-humorada para jogar direto na web.',
    focus: 'Intera��o simples e publica��o web.',
    images: ['assets/images/AlisaMeuPelo/screenshot-01.png'],
    links: [{ label: 'Jogar no itch.io', url: 'https://ganest11.itch.io/alisa-meu-pelo-floppa' }],
    district: 'arcade',
    world: [-5, 20]
  },
  {
    id: 'g-tierlist',
    title: 'G-Tierlist',
    type: 'personal',
    categories: ['web', 'tools'],
    tags: ['Web', 'Organiza��o', 'GitHub Pages'],
    description: 'Plataforma web para criar e gerenciar tier lists, organizando elementos em rankings personalizados.',
    contribution: 'Desenvolvimento de uma ferramenta web independente para montar e organizar listas.',
    context: 'Um jeito simples de comparar e ordenar itens de interesse.',
    focus: 'Cria��o e gerenciamento de rankings personalizados.',
    images: ['assets/images/GTierList/screenshot-01.png'],
    links: [{ label: 'Abrir projeto', url: 'https://ganestgamer11.github.io/G-TierList/' }],
    district: 'tools',
    world: [18, -12]
  },
  {
    id: 'my-games',
    title: 'My Games Played',
    type: 'personal',
    categories: ['web', 'tools'],
    tags: ['Web', 'Registro pessoal', 'GitHub Pages'],
    description: 'Site pessoal para registrar jogos jogados e as avalia��es atribu�das em cada per�odo.',
    contribution: 'Cria��o de um espa�o pessoal para catalogar jogos e avalia��es.',
    context: 'Registro naveg�vel de experi�ncias com jogos.',
    focus: 'Organiza��o e apresenta��o de um cat�logo pessoal.',
    images: ['assets/images/MyGamesPlayed/screenshot-01.png', 'assets/images/MyGamesPlayed/screenshot-02.png'],
    links: [{ label: 'Abrir projeto', url: 'https://ganestgamer11.github.io/MyGames-Ganest11/' }],
    district: 'tools',
    world: [22, -16]
  },
  {
    id: 'clicker',
    title: 'Clicker Game',
    type: 'personal',
    categories: ['games', 'web'],
    tags: ['Web Game', 'JavaScript', 'Progress�o'],
    description: 'Um dos primeiros jogos web: clicker com sistema de upgrades e progress�o, desenvolvido principalmente em JavaScript.',
    contribution: 'Projeto autoral de aprendizado com evolu��o incremental e melhorias de gameplay.',
    context: 'Jogo de cliques em que upgrades mudam o ritmo da progress�o.',
    focus: 'Progress�o, upgrades e l�gica de jogo.',
    images: ['assets/images/ClickerGame/screenshot-01.png'],
    links: [{ label: 'Abrir projeto', url: 'https://ganestgamer11.github.io/Clicker-game-projeto01/' }],
    district: 'arcade',
    world: [0, 22]
  },
  {
    id: 'meow-search',
    title: 'Meow Search',
    type: 'academic',
    categories: ['web', 'tools'],
    tags: ['Web', 'Acad�mico', 'Busca'],
    description: 'Projeto acad�mico: uma vers�o divertida e personalizada de mecanismo de busca, inspirada no Google e com tem�tica de gatos.',
    contribution: 'Desenvolvimento de uma interface de busca tem�tica como projeto acad�mico.',
    context: 'Experimento de interface web inspirado em mecanismos de busca.',
    focus: 'Busca, identidade visual e organiza��o de conte�do.',
    images: ['assets/images/MeowSearch/screenshot-01.png'],
    links: [{ label: 'Abrir projeto', url: 'https://ganestgamer11.github.io/Meow-Search/' }],
    district: 'archive',
    world: [24, 14]
  },
  {
    id: 'septandara',
    title: 'Septandara',
    type: 'academic',
    categories: ['games', 'web'],
    tags: ['Unity', 'C#', 'Projeto de TCC'],
    description: 'Jogo desenvolvido ao longo de dois anos como projeto de TCC do curso t�cnico, apresentado em uma p�gina web pr�pria.',
    contribution: 'Desenvolvimento do jogo com Unity e C#, al�m da p�gina de apresenta��o do projeto.',
    context: 'Projeto de conclus�o do curso T�cnico em Inform�tica para Internet.',
    focus: 'Desenvolvimento de jogo e apresenta��o web.',
    images: ['assets/images/Septandara/screenshot-01.png', 'assets/images/Septandara/screenshot-02.png', 'assets/images/Septandara/screenshot-03.png', 'assets/images/Septandara/screenshot-04.png'],
    links: [{ label: 'Abrir projeto', url: 'https://ganestgamer11.github.io/septandara/' }],
    district: 'archive',
    world: [30, 22]
  }
];
const explorerModuleUrl = new URL('./explorer.js', document.currentScript.src).href;

const palettePresets = {
  'deep-sea': { name: 'Deep Sea', ink: '#0d1b2a', prussian: '#1b263b', dusk: '#415a77', lavender: '#778da9', alabaster: '#e0e1dd', swatchNames: ['Ink Black', 'Prussian Blue', 'Dusk Blue', 'Lavender Grey', 'Alabaster Grey'] },
  'forest-signal': { name: 'Forest Signal', ink: '#10211d', prussian: '#1b352e', dusk: '#456b5d', lavender: '#94aa8d', alabaster: '#e4e8dc', swatchNames: ['Forest Ink', 'Deep Canopy', 'Dusk Green', 'Sage Grey', 'Mist Green'] },
  'ember-archive': { name: 'Ember Archive', ink: '#24191b', prussian: '#3a262b', dusk: '#7b5259', lavender: '#bb8580', alabaster: '#efe6dc', swatchNames: ['Ember Ink', 'Plum Smoke', 'Rosewood', 'Clay Rose', 'Linen'] },
  'twilight-purple-dreams': { name: 'Twilight Purple Dreams', ink: '#171738', prussian: '#2e1760', dusk: '#3423a6', lavender: '#7180b9', alabaster: '#dff3e4', swatchNames: ['Space Indigo', 'Deep Twilight', 'Vivid Royal', 'Glaucous', 'Honeydew'] },
  'deep-sea-symphony': { name: 'Deep Sea Symphony', ink: '#071013', prussian: '#23b5d3', dusk: '#75abbc', lavender: '#a2aebb', alabaster: '#dfe0e2', swatchNames: ['Ink Black', 'Turquoise Surf', 'Pacific Blue', 'Cool Steel', 'Alabaster Grey'] }
};

const categoryLabels = {
  systems: 'Sistemas',
  web: 'Web',
  mobile: 'Mobile',
  games: 'Jogos',
  tools: 'Ferramentas'
};
const typeLabels = {
  professional: 'Profissional',
  personal: 'Pessoal',
  academic: 'Acad�mico'
};
const state = { type: 'all', category: 'all', tag: 'all', query: '' };
const projectGrid = document.getElementById('projectGrid');
const projectCount = document.getElementById('projectCount');
const emptyState = document.getElementById('emptyState');
const projectDialog = document.getElementById('projectDialog');
const projectDialogContent = document.getElementById('projectDialogContent');

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function projectCard(project) {
  const card = node('article', 'project-card');
  if (project.featured) card.classList.add('is-featured');
  card.dataset.projectId = project.id;

  const cover = node('button', 'project-cover');
  cover.type = 'button';
  cover.dataset.openProject = project.id;
  cover.setAttribute('aria-label', 'Ver detalhes de ' + project.title);
  const image = node('img');
  image.src = project.images[0];
  image.alt = 'Captura de tela do projeto ' + project.title;
  image.loading = 'lazy';
  image.decoding = 'async';
  cover.append(image);
  card.append(cover);

  const body = node('div', 'project-card-body');
  const meta = node('div', 'project-meta');
  const type = node('span', 'project-type', typeLabels[project.type]);
  type.dataset.type = project.type;
  meta.append(type);
  if (project.status) meta.append(node('span', 'project-status', project.status));
  body.append(meta);

  const titleButton = node('button', 'project-title-button');
  titleButton.type = 'button';
  titleButton.dataset.openProject = project.id;
  titleButton.setAttribute('aria-label', 'Abrir detalhes de ' + project.title);
  titleButton.append(node('span', 'project-card-heading', project.title));
  body.append(titleButton);
  body.append(node('p', 'project-description', project.description));

  const tags = node('div', 'project-tags');
  project.tags.slice(0, 5).forEach(function (tag) {
    const button = node('button', 'project-tag-button', tag);
    button.type = 'button';
    button.dataset.filterTag = tag;
    button.setAttribute('aria-label', 'Filtrar projetos pela tag ' + tag);
    tags.append(button);
  });
  body.append(tags);

  const footer = node('div', 'project-card-footer');
  const details = node('button', 'details-link', 'Ver estudo de caso');
  details.type = 'button';
  details.dataset.openProject = project.id;
  details.append(document.createTextNode(' '));
  const arrow = node('span', '', '?');
  arrow.setAttribute('aria-hidden', 'true');
  details.append(arrow);
  footer.append(details);
  body.append(footer);
  card.append(body);
  return card;
}

function renderProjects() {
  const fragment = document.createDocumentFragment();
  projects.forEach(function (project) { fragment.append(projectCard(project)); });
  projectGrid.replaceChildren(fragment);
  projectGrid.setAttribute('aria-busy', 'false');
}

function initializeTechnologyFilter() {
  const select = document.getElementById('technologyFilter');
  const allTags = Array.from(new Set(projects.flatMap(function (project) { return project.tags; }))).sort(function (a, b) {
    return a.localeCompare(b, 'pt-BR');
  });
  allTags.forEach(function (tag) {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    select.append(option);
  });
}

function matches(project) {
  const typeMatches = state.type === 'all' || project.type === state.type;
  const categoryMatches = state.category === 'all' || project.categories.includes(state.category);
  const tagMatches = state.tag === 'all' || project.tags.includes(state.tag);
  const haystack = [project.title, project.description, project.contribution, project.context, project.focus, project.tags.join(' '), project.categories.map(function (category) { return categoryLabels[category] || category; }).join(' ')].join(' ').toLocaleLowerCase('pt-BR');
  const queryMatches = !state.query || haystack.includes(state.query);
  return typeMatches && categoryMatches && tagMatches && queryMatches;
}

function updateFilters() {
  let visible = 0;
  projects.forEach(function (project) {
    const card = projectGrid.querySelector('[data-project-id="' + project.id + '"]');
    const show = matches(project);
    card.hidden = !show;
    if (show) visible += 1;
  });
  projectCount.textContent = visible + (visible === 1 ? ' projeto encontrado' : ' projetos encontrados');
  emptyState.hidden = visible !== 0;
  const hasFilters = state.type !== 'all' || state.category !== 'all' || state.tag !== 'all' || Boolean(state.query);
  document.getElementById('clearFilters').hidden = !hasFilters;
}

function setPressed(groupSelector, dataAttribute, value) {
  document.querySelectorAll(groupSelector + ' [' + dataAttribute + ']').forEach(function (button) {
    const active = button.getAttribute(dataAttribute) === value;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function clearFilters() {
  state.type = 'all';
  state.category = 'all';
  state.tag = 'all';
  state.query = '';
  document.querySelector('[data-filter-type="all"]').classList.add('is-active');
  setPressed('.type-filters', 'data-filter-type', 'all');
  setPressed('.category-filters', 'data-filter-category', 'all');
  document.getElementById('technologyFilter').value = 'all';
  document.getElementById('projectSearch').value = '';
  updateFilters();
}

function openProject(projectId) {
  const project = projects.find(function (item) { return item.id === projectId; });
  if (!project) return;
  projectDialogContent.replaceChildren();

  const top = node('div', 'dialog-topline');
  const type = node('span', 'project-type', typeLabels[project.type]);
  type.dataset.type = project.type;
  top.append(type);
  const close = node('button', 'icon-button', '�');
  close.type = 'button';
  close.setAttribute('aria-label', 'Fechar detalhes do projeto');
  close.addEventListener('click', function () { projectDialog.close(); });
  top.append(close);
  projectDialogContent.append(top);

  const heading = node('div', 'detail-heading');
  const dialogTitle = node('h2', '', project.title);
  dialogTitle.id = 'projectDialogTitle';
  heading.append(dialogTitle);
  projectDialogContent.append(heading);
  projectDialogContent.append(node('p', 'detail-summary', project.description));

  if (project.images.length) {
    const gallery = node('div', 'detail-gallery');
    const mainImage = node('img', 'detail-image-main');
    mainImage.src = project.images[0];
    mainImage.alt = 'Captura de tela do projeto ' + project.title;
    mainImage.decoding = 'async';
    gallery.append(mainImage);
    if (project.images.length > 1) {
      const thumbs = node('div', 'detail-thumbs');
      project.images.forEach(function (src, index) {
        const button = node('button', 'detail-thumb');
        button.type = 'button';
        button.setAttribute('aria-label', 'Mostrar imagem ' + (index + 1) + ' do projeto');
        button.setAttribute('aria-pressed', String(index === 0));
        const thumbImage = node('img');
        thumbImage.src = src;
        thumbImage.alt = '';
        thumbImage.loading = 'lazy';
        button.append(thumbImage);
        button.addEventListener('click', function () {
          mainImage.src = src;
          mainImage.alt = 'Captura ' + (index + 1) + ' do projeto ' + project.title;
          thumbs.querySelectorAll('.detail-thumb').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
        });
        thumbs.append(button);
      });
      gallery.append(thumbs);
    }
    projectDialogContent.append(gallery);
  }

  const blocks = node('div', 'detail-body');
  [
    ['Contexto', project.context],
    ['Contribui��o', project.contribution],
    ['Foco do projeto', project.focus],
    ['Categoria', project.categories.map(function (category) { return categoryLabels[category] || category; }).join(' � ')]
  ].forEach(function (entry) {
    const block = node('section', 'detail-block');
    block.append(node('h3', '', entry[0]));
    block.append(node('p', '', entry[1]));
    blocks.append(block);
  });
  projectDialogContent.append(blocks);

  const tags = node('div', 'project-tags');
  project.tags.forEach(function (tag) { tags.append(node('span', 'project-tag', tag)); });
  projectDialogContent.append(tags);

  const links = node('div', 'detail-links');
  project.links.forEach(function (link) {
    const anchor = node('a', 'detail-link', link.label + ' ?');
    anchor.href = link.url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    links.append(anchor);
  });
  if (project.links.length) projectDialogContent.append(links);
  projectDialog.showModal();
}

projectGrid.addEventListener('click', function (event) {
  const filterTagButton = event.target.closest('[data-filter-tag]');
  if (filterTagButton) {
    state.tag = filterTagButton.dataset.filterTag;
    document.getElementById('technologyFilter').value = state.tag;
    updateFilters();
    document.getElementById('projetos').scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  const opener = event.target.closest('[data-open-project]');
  if (opener) openProject(opener.dataset.openProject);
});
projectDialog.addEventListener('click', function (event) {
  if (event.target === projectDialog) projectDialog.close();
});

document.querySelectorAll('[data-filter-type]').forEach(function (button) {
  button.addEventListener('click', function () {
    state.type = button.dataset.filterType;
    setPressed('.type-filters', 'data-filter-type', state.type);
    updateFilters();
  });
});
document.querySelectorAll('[data-filter-category]').forEach(function (button) {
  button.addEventListener('click', function () {
    state.category = button.dataset.filterCategory;
    setPressed('.category-filters', 'data-filter-category', state.category);
    updateFilters();
  });
});
document.getElementById('technologyFilter').addEventListener('change', function (event) {
  state.tag = event.target.value;
  updateFilters();
});
document.getElementById('projectSearch').addEventListener('input', function (event) {
  state.query = event.target.value.trim().toLocaleLowerCase('pt-BR');
  updateFilters();
});
document.getElementById('clearFilters').addEventListener('click', clearFilters);
document.getElementById('emptyClear').addEventListener('click', clearFilters);
renderProjects();
initializeTechnologyFilter();
updateFilters();

function updateTheme(theme) {
  if (theme !== 'dark' && theme !== 'white') return;
  const root = document.documentElement;
  const palette = palettePresets[root.dataset.palette] || palettePresets['deep-sea'];
  root.dataset.theme = theme;
  root.style.colorScheme = theme === 'white' ? 'light' : 'dark';
  try { localStorage.setItem('ganest-theme', theme); } catch (_) {}
  document.querySelectorAll('[data-theme-choice]').forEach(function (button) {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
  });
  document.getElementById('themeModeLabel').textContent = theme === 'white' ? 'White' : 'Dark';
  document.querySelector('meta[name="theme-color"]').content = theme === 'white' ? palette.alabaster : palette.ink;
  window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: { theme: theme, palette: root.dataset.palette } }));
}
function updatePalette(paletteId) {
  const palette = palettePresets[paletteId];
  if (!palette) return;
  document.documentElement.dataset.palette = paletteId;
  try { localStorage.setItem('ganest-palette', paletteId); } catch (_) {}
  document.getElementById('paletteTriggerName').textContent = palette.name;
  document.getElementById('currentPaletteName').textContent = palette.name;
  document.querySelectorAll('[data-palette-choice]').forEach(function (button) {
    button.setAttribute('aria-pressed', String(button.dataset.paletteChoice === paletteId));
  });
  const swatches = document.querySelector('.palette-swatches');
  swatches.setAttribute('aria-label', 'Cores da paleta ' + palette.name + ': ' + palette.swatchNames.join(', '));
  swatches.querySelectorAll('i').forEach(function (swatch, index) {
    swatch.title = palette.swatchNames[index] + ' ' + Object.values(palette).filter(function (value) { return typeof value === 'string' && value.startsWith('#'); })[index];
  });
  document.getElementById('themeSwitch').setAttribute('aria-label', 'Modo de cor da paleta ' + palette.name);
  updateTheme(document.documentElement.dataset.theme);
}
document.querySelectorAll('[data-palette-choice]').forEach(function (button) {
  button.addEventListener('click', function () { updatePalette(button.dataset.paletteChoice); });
});
document.querySelectorAll('[data-theme-choice]').forEach(function (button) {
  button.addEventListener('click', function () {
    updateTheme(button.dataset.themeChoice);
  });
});
updatePalette(document.documentElement.dataset.palette);
document.addEventListener('click', function (event) {
  const menu = document.getElementById('paletteMenu');
  if (menu.open && !menu.contains(event.target)) menu.open = false;
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') document.getElementById('paletteMenu').open = false;
});

const nav = document.getElementById('primaryNav');
const menuToggle = document.getElementById('menuToggle');
function closeMobileMenu() {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
}
menuToggle.addEventListener('click', function () {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('is-open', open);
});
nav.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMobileMenu); });

const explorerDialog = document.getElementById('explorerDialog');
const explorerCanvas = document.getElementById('explorerCanvas');
const explorerFallback = document.getElementById('explorerFallback');
const fallbackProjects = document.getElementById('fallbackProjects');
const selectedProjectName = document.getElementById('selectedProjectName');
const openSelectedProject = document.getElementById('openSelectedProject');
let selectedProjectId = null;
let explorerInstance = null;
let explorerStarted = false;
let explorerLoading = false;

function selectExplorerProject(projectId) {
  const project = projects.find(function (item) { return item.id === projectId; });
  if (!project) return;
  selectedProjectId = projectId;
  selectedProjectName.textContent = project.title;
  openSelectedProject.disabled = false;
}
function showExplorerFallback(reason) {
  explorerCanvas.hidden = true;
  document.getElementById('explorerInstructions').hidden = true;
  document.querySelector('.explorer-legend').hidden = true;
  document.getElementById('touchControls').hidden = true;
  explorerFallback.hidden = false;
  const description = explorerFallback.querySelector('p');
  if (reason) description.textContent = reason + ' O cat�logo continua dispon�vel por esta lista.';
  fallbackProjects.replaceChildren();
  projects.forEach(function (project) {
    const button = node('button', 'fallback-project');
    button.type = 'button';
    button.append(node('strong', '', project.title));
    button.append(node('small', '', typeLabels[project.type] + ' � ' + project.categories.map(function (category) { return categoryLabels[category] || category; }).join(' / ')));
    button.addEventListener('click', function () { openProject(project.id); });
    fallbackProjects.append(button);
  });
}
async function startExplorer() {
  if (explorerStarted || explorerLoading) return;
  explorerLoading = true;
  try {
    const module = await import(explorerModuleUrl);
    if (!explorerDialog.open) return;
    explorerInstance = await module.mountExplorer({
      canvas: explorerCanvas,
      projects: projects,
      onSelectProject: selectExplorerProject,
      onOpenProject: openProject,
      touchControls: document.getElementById('touchControls'),
      selectedProjectName: selectedProjectName,
      openSelectedProject: openSelectedProject
    });
    explorerStarted = true;
  } catch (error) {
    console.error('N�o foi poss�vel iniciar o mapa 3D:', error);
    const reason = window.location.protocol === 'file:'
      ? 'O mapa 3D precisa ser aberto por localhost ou pelo site em HTTPS. O navegador bloqueia m�dulos ao abrir o HTML diretamente como arquivo.'
      : 'O mapa 3D n�o conseguiu carregar. Confira o acesso � biblioteca externa e o suporte a WebGL neste navegador.';
    showExplorerFallback(reason);
  } finally {
    explorerLoading = false;
  }
}
function openExplorer() {
  closeMobileMenu();
  if (!explorerDialog.open) explorerDialog.showModal();
  if (explorerFallback.hidden) startExplorer();
  window.setTimeout(function () { if (!explorerCanvas.hidden) explorerCanvas.focus(); }, 80);
}
document.querySelectorAll('[data-open-explorer]').forEach(function (button) {
  button.addEventListener('click', openExplorer);
});
document.getElementById('closeExplorer').addEventListener('click', function () { explorerDialog.close(); });
document.getElementById('explorerBackToProjects').addEventListener('click', function () {
  explorerDialog.close();
  document.getElementById('projetos').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
openSelectedProject.addEventListener('click', function () {
  if (selectedProjectId) openProject(selectedProjectId);
});
explorerDialog.addEventListener('close', function () {
  if (explorerInstance && typeof explorerInstance.dispose === 'function') {
    explorerInstance.dispose();
    explorerInstance = null;
    explorerStarted = false;
    selectedProjectId = null;
    selectedProjectName.textContent = 'Navegue at� um farol';
    openSelectedProject.disabled = true;
  }
});
explorerDialog.addEventListener('click', function (event) {
  if (event.target === explorerDialog) explorerDialog.close();
});

window.portfolioProjects = projects;

