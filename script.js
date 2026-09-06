const sections = [...document.querySelectorAll('[data-section]')];
const sectionButtons = [...document.querySelectorAll('[data-section-target]')];
const primaryNavButtons = [...document.querySelectorAll('.site-nav [data-section-target]')];

function showSection(sectionName, trigger) {
  const nextSection = sections.find((section) => section.dataset.section === sectionName);

  if (!nextSection) return;

  sections.forEach((section) => {
    const isActive = section === nextSection;
    section.hidden = !isActive;
    section.classList.toggle('is-active', isActive);
    section.classList.remove('is-entering');
  });

  primaryNavButtons.forEach((button) => {
    if (button.dataset.sectionTarget === sectionName) {
      button.setAttribute('aria-current', 'page');
    } else {
      button.removeAttribute('aria-current');
    }
  });

  requestAnimationFrame(() => nextSection.classList.add('is-entering'));

  if (trigger) {
    const heading = nextSection.querySelector('h1, h2');
    heading?.setAttribute('tabindex', '-1');
    heading?.focus({ preventScroll: true });
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

sectionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    showSection(button.dataset.sectionTarget, button);
  });
});

const projects = [
  {
    number: '01',
    title: 'YuGiOh Card Maker',
    category: 'Full-stack application',
    description:
      "As a Yu-Gi-Oh! fan, I built my own ad-free card maker with quality-of-life improvements and high-quality assets that make custom cards look real. \n\n Through this project, I learned the basics of Angular, Express, PostgreSQL, and user authentication. Users can easily edit, preview, export, and save their cards for future use.",
    tags: ['Angular Framework', 'HTML/CSS', 'TypeScript'],
    link: 'https://github.com/MatthewLandis/CardMaker',
    image: 'imgs/YuGiOh.png',
  },
  {
    number: '02',
    title: 'Notebook',
    category: 'Backend Project',
    description:
      "Notebook is a very small project that I completed in a few days. It's a minimalistic website where users can write and post stories anonymously and read those stories posted by other users at random. \n\n Its simple design allowed me to visualize and understand the importance of Backend development and server architecture.",
    tags: ['Angular Framework', 'Express', 'PostgreSQL'],
    link: 'https://github.com/MatthewLandis/Notebook-Frontend',
    image: 'imgs/Notebook.jpeg',
  },
  {
    number: '03',
    title: 'Expire',
    category: 'App Development',
    description:
      'My current project—and one I’m excited about—is Expire, an app that lets users scan and save food expiration dates to their profiles. Expire then visualizes which foods are nearing expiration or have already spoiled.',
    tags: ['Angular Framework'],
    link: 'https://github.com/',
    image: 'imgs/Expire.png',
  }
];

let selectedProjectIndex = 0;

const projectElements = {
  visual: document.querySelector('#project-visual'),
  image: document.querySelector('#project-image'),
  title: document.querySelector('#project-title'),
  description: document.querySelector('#project-description'),
  tags: document.querySelector('#project-tags'),
  link: document.querySelector('#project-link'),
  tabs: [...document.querySelectorAll('[data-project-index]')]
};

function renderProject(index) {
  // Wrap the index so the arrows move from the last project back to the first.
  selectedProjectIndex = (index + projects.length) % projects.length;
  const project = projects[selectedProjectIndex];

  // Update only elements that exist in the current projects markup.
  projectElements.image.src = project.image;
  projectElements.image.alt = `${project.title} project image`;
  projectElements.title.textContent = project.title;
  projectElements.description.textContent = project.description;
  projectElements.link.href = project.link;
  projectElements.link.setAttribute('aria-label', `View ${project.title} project`);

  projectElements.tags.replaceChildren(
    ...project.tags.map((tag) => {
      const item = document.createElement('li');
      item.textContent = tag;
      return item;
    })
  );

  projectElements.tabs.forEach((tab, tabIndex) => {
    tab.setAttribute('aria-selected', String(tabIndex === selectedProjectIndex));
  });

  projectElements.visual.animate(
    [
      { opacity: 0.55, transform: 'translateX(0.6rem)' },
      { opacity: 1, transform: 'translateX(0)' }
    ],
    { duration: 320, easing: 'ease-out' }
  );
}

projectElements.tabs.forEach((tab) => {
  tab.addEventListener('click', () => renderProject(Number(tab.dataset.projectIndex)));
});

document.querySelector('#previous-project').addEventListener('click', () => {
  renderProject(selectedProjectIndex - 1);
});

document.querySelector('#next-project').addEventListener('click', () => {
  renderProject(selectedProjectIndex + 1);
});

// Show Home when the page first loads and mark it active in the header.
showSection('home');

// Render the first project so its content is ready when Projects is opened.
renderProject(0);
