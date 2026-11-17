// Christina P. Vinces - Portfolio Interactivity
document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const toast = document.getElementById('toast');

  // Toast helper
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  // Theme Toggle with localStorage persistence
  const savedTheme = localStorage.getItem('cv-theme');
  if (savedTheme === 'light') {
    htmlEl.classList.remove('dark');
    htmlEl.classList.add('light');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = htmlEl.classList.toggle('light');
    htmlEl.classList.toggle('dark', !isLight);
    sunIcon.classList.toggle('hidden', !isLight);
    moonIcon.classList.toggle('hidden', isLight);
    localStorage.setItem('cv-theme', isLight ? 'light' : 'dark');
  });

  // Print / Save PDF
  document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
  });

  // Clipboard copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(value);
        showToast(`Copied: ${value}`);
      } catch {
        showToast(`Contact: ${value}`);
      }
    });
  });

  // Experience Domain Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const roleCards = document.querySelectorAll('.role-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      roleCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Collapsible Role Details
  document.querySelectorAll('.toggle-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.role-card');
      const body = card.querySelector('.role-body');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isExpanded));
      btn.textContent = isExpanded ? 'Expand' : 'Collapse';
      body.classList.toggle('hidden', isExpanded);
    });
  });

  // Connect Modal Controls
  const modal = document.getElementById('connectModal');
  const openModalTriggers = [
    document.getElementById('contactModalBtn'),
    document.getElementById('openConnectHero')
  ];
  const closeModalTriggers = [
    document.getElementById('closeModalBtn'),
    document.getElementById('cancelModalBtn')
  ];

  openModalTriggers.forEach(el => el?.addEventListener('click', () => {
    modal.classList.remove('hidden');
  }));

  closeModalTriggers.forEach(el => el?.addEventListener('click', () => {
    modal.classList.add('hidden');
  }));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('inquirySubject').value;
    const message = document.getElementById('senderMessage').value.trim();

    const mailtoBody = encodeURIComponent(`From: ${name} (${email})

${message}`);
    const mailtoUrl = `mailto:christina.vinces@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
    window.location.href = mailtoUrl;
    modal.classList.add('hidden');
    showToast('Opening your default email client...');
  });

  // Scroll Reveal Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
