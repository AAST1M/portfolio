// Portfolio Interactive Script for Marwan El-Sawy

const PROJECTS = [
  {
    id: 'mario-logic',
    title: 'Mario Logic & Algo Pro',
    category: 'Interactive Simulator',
    description: 'High-performance interactive 2D digital logic circuit simulator, automated truth table matrix evaluator, and Karnaugh Map (K-Map) Quine-McCluskey solver with PDF, PNG, CSV, and JSON multi-format exports.',
    repo: 'https://github.com/AAST1M/mario-logic-algo',
    tags: ['Vanilla JS', 'HTML5 Canvas 2D', 'Vite', 'Node Test Runner'],
    bg: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #991b1b 100%)'
  },
  {
    id: 'auto-care-ai',
    title: 'Auto-Care AI Platform',
    category: 'AI Automotive App',
    description: 'Integrated platform for vehicle diagnostics, roadside towing winch dispatch with fair price negotiation, and verified workshop discovery in Cairo/Giza, featuring Gemini AI diagnostic troubleshooting.',
    repo: 'https://github.com/AAST1M/auto-CARe',
    tags: ['React 19', 'TypeScript', 'Google Gemini AI', 'Vite', 'Tailwind CSS'],
    bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0369a1 100%)'
  },
  {
    id: 'aast-suite',
    title: 'Academic Algorithms Suite',
    category: 'AAST CS Coursework',
    description: 'Comprehensive software engineering coursework, data structure implementations, and algorithm benchmarks developed at AASTMT Smart Village Campus.',
    repo: 'https://github.com/AAST1M',
    tags: ['C++', 'Python', 'Java', 'Data Structures', 'Algorithms'],
    bg: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #111827 100%)'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Menu Tabs
  const menuLinks = document.querySelectorAll('.menu-link');
  const pageViews = document.querySelectorAll('.page-view');

  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetRoute = link.getAttribute('data-route');

      menuLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      pageViews.forEach(view => {
        if (view.getAttribute('data-view') === targetRoute) {
          view.classList.add('is-active');
        } else {
          view.classList.remove('is-active');
        }
      });
    });
  });

  // Render Carousel Cards
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.getElementById('carouselDots');
  const carouselCurrent = document.getElementById('carouselCurrent');
  const carouselProgressBar = document.getElementById('carouselProgressBar');
  const carouselRepoBtn = document.getElementById('carouselRepo');
  const carouselDetailBtn = document.getElementById('carouselDetail');

  let activeIndex = 0;

  function renderCarousel() {
    if (!carouselTrack) return;
    carouselTrack.innerHTML = '';
    carouselDots.innerHTML = '';

    PROJECTS.forEach((project, idx) => {
      // Create Card
      const card = document.createElement('div');
      card.className = `portfolio-card ${idx === activeIndex ? 'is-active' : ''}`;
      card.style.background = project.bg;

      card.innerHTML = `
        <div class="card-content">
          <h2>${project.title}</h2>
          <p>${project.description}</p>
        </div>
      `;

      card.addEventListener('click', () => setActiveProject(idx));
      carouselTrack.appendChild(card);

      // Create Dot
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === activeIndex ? 'is-active' : ''}`;
      dot.ariaLabel = `Project ${idx + 1}`;
      dot.addEventListener('click', () => setActiveProject(idx));
      carouselDots.appendChild(dot);
    });

    updateCarouselMeta();
  }

  function setActiveProject(idx) {
    activeIndex = idx;
    renderCarousel();
  }

  function updateCarouselMeta() {
    const current = PROJECTS[activeIndex];
    if (carouselCurrent) carouselCurrent.textContent = `${activeIndex + 1} / ${PROJECTS.length} — ${current.category}`;
    if (carouselProgressBar) carouselProgressBar.style.width = `${((activeIndex + 1) / PROJECTS.length) * 100}%`;
    if (carouselRepoBtn) carouselRepoBtn.href = current.repo;
  }

  // Prev / Next Arrows
  const prevBtn = document.querySelector('.nav-prev');
  const nextBtn = document.querySelector('.nav-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + PROJECTS.length) % PROJECTS.length;
      renderCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % PROJECTS.length;
      renderCarousel();
    });
  }

  // Modal Dialog
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalTags = document.getElementById('modalTags');

  if (carouselDetailBtn) {
    carouselDetailBtn.addEventListener('click', () => {
      const current = PROJECTS[activeIndex];
      if (modalTitle) modalTitle.textContent = current.title;
      if (modalDescription) modalDescription.textContent = current.description;
      if (modalTags) {
        modalTags.innerHTML = current.tags.map(t => `<span>${t}</span>`).join(' ');
      }
      if (projectModal) projectModal.removeAttribute('hidden');
    });
  }

  function closeModal() {
    if (projectModal) projectModal.setAttribute('hidden', 'true');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Initialize Carousel
  renderCarousel();
});
