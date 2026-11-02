const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const trackedSections = document.querySelectorAll('main section[id]');
const navCta = document.querySelector('.main-nav .nav-cta');

const updateHeaderState = () => {
    if (!header) {
        return;
    }

    const isScrolled = window.scrollY > 16;
    header.classList.toggle('is-scrolled', isScrolled);
};

const applyActiveNavState = (sectionId) => {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${sectionId}`;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    if (navCta) {
        navCta.classList.toggle('is-active', sectionId === 'hablemos');
    }
};

const getCurrentSectionId = () => {
    if (!trackedSections.length) {
        return '';
    }

    let currentSection = trackedSections[0];
    let smallestDistance = Number.POSITIVE_INFINITY;

    trackedSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - 120);

        if (distance < smallestDistance) {
            currentSection = section;
            smallestDistance = distance;
        }
    });

    return currentSection.id;
};

if (header) {
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
}

if (navLinks.length && trackedSections.length) {
    applyActiveNavState(getCurrentSectionId());

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));

            if (!visibleSections.length) {
                return;
            }

            applyActiveNavState(visibleSections[0].target.id);
        }, { threshold: [0.2, 0.45, 0.7], rootMargin: '-10% 0px -35% 0px' });

        trackedSections.forEach((section) => sectionObserver.observe(section));
    }
}

const revealItems = document.querySelectorAll('.solution-card, .method, .contact');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => {
        item.classList.add('reveal');
        revealObserver.observe(item);
    });
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}
