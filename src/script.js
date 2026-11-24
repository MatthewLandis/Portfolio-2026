const sections = [...document.querySelectorAll('[data-section]')];
const primaryNavButtons = [...document.querySelectorAll('#header nav [data-target]')];

// Display the requested page section and update navigation accessibility state.
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
    if (button.dataset.target === sectionName) {
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

const projects = [
  {
    title: 'YuGiOh Card Maker',
    description:
      "As a Yu-Gi-Oh! fan, I built my own ad-free card maker with quality-of-life improvements and high-quality assets that make custom cards look real. \n\n Through this project, I learned the basics of Angular, Express, PostgreSQL, and user authentication. Users can easily edit, preview, export, and save their cards for future use.",
    tags: ['Angular Framework', 'HTML/CSS', 'TypeScript'],
    linkSite: 'https://cardmaker-frontend-production-47eb.up.railway.app/',
    linkGit: 'https://github.com/MatthewLandis/CardMaker',
    image: 'imgs/YuGiOh.png',
  },
  {
    title: 'Notebook',
    description:
      "Notebook is a very small project that I completed in a few days. It's a minimalistic website where users can write and post stories anonymously and read those stories posted by other users at random. \n\n Its simple design allowed me to visualize and understand the importance of Backend development and server architecture.",
    tags: ['Angular Framework', 'Express', 'PostgreSQL'],
    linkSite: 'https://notebook-frontend-production-cc83.up.railway.app/',
    linkGit: 'https://github.com/MatthewLandis/Notebook-Frontend',
    image: 'imgs/Notebook.jpeg',
  },
  {
    title: 'Expire',
    description:
      "Expire is a web app I built to keep track of the food in my fridge. Users add their food and its expiration date, and Expire shows what needs eating soon, so less of it ends up in the bin. \n\n Food sits in a drag-and-drop fridge with a freezer at the top, color-coded from green (fresh) to red (expired). Users can mark food as eaten or thrown out, and their profile keeps count. This was my first project with an ASP.NET Core backend.",
    tags: ['Angular Framework', 'ASP.NET Core', 'PostgreSQL'],
    linkSite: '',
    linkGit: 'https://github.com/MatthewLandis/Expire',
    image: 'imgs/Expire.jpg',
  }
];

let selectedProjectIndex = 0;

const projectElements = {
  visual: document.querySelector('#project-visual'),
  image: document.querySelector('#project-image'),
  title: document.querySelector('#project-title'),
  description: document.querySelector('#project-description'),
  tags: document.querySelector('#project-tags'),
  linkSite: document.querySelector('#project-linkSite'),
  linkGit: document.querySelector('#project-linkGit'),
  tabs: [...document.querySelectorAll('[data-project-index]')]
};

// Render the selected project and keep the project controls in sync.
function renderProject(index) {
  // Wrap the index so the arrows move from the last project back to the first.
  selectedProjectIndex = (index + projects.length) % projects.length;
  const project = projects[selectedProjectIndex];

  projectElements.image.src = project.image;
  projectElements.image.alt = `${project.title} project image`;
  projectElements.title.textContent = project.title;
  projectElements.description.textContent = project.description;
  projectElements.linkSite.href = project.linkSite || project.link;
  // Hide the website link when a project has no live site yet.
  projectElements.linkSite.hidden = !project.linkSite;
  projectElements.linkGit.href = project.linkGit || project.link;
  projectElements.linkSite.setAttribute('aria-label', `Visit the ${project.title} website`);
  projectElements.linkGit.setAttribute('aria-label', `View the ${project.title} GitHub page`);

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

// Initialize the page with the Home section and first project selected.
showSection('home');
renderProject(0);
