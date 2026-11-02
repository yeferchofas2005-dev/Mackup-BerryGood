const revealItems = document.querySelectorAll('.section-heading, .service-card, .approach-intro, .approach-step, .about-inner');
const navigationLinks = [...document.querySelectorAll('.main-nav a[href^="#"]:not(.nav-contact)')];
const trackedSections = document.querySelectorAll('#inicio, #servicios, #empresa');

if ('IntersectionObserver' in window) {
	if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.14, rootMargin: '0px 0px -32px 0px' });

		let staggerIndex = 0;

		revealItems.forEach((item) => {
			item.classList.add('reveal');

			if (item.matches('.service-card, .approach-step')) {
				item.style.setProperty('--reveal-delay', `${(staggerIndex % 3) * 90}ms`);
				staggerIndex += 1;
			}

			revealObserver.observe(item);
		});
	}

	const sectionObserver = new IntersectionObserver((entries) => {
		const visibleSections = entries.filter((entry) => entry.isIntersecting);

		if (!visibleSections.length) {
			return;
		}

		const currentSection = visibleSections.reduce((closest, entry) => (
			Math.abs(entry.boundingClientRect.top) < Math.abs(closest.boundingClientRect.top)
				? entry
				: closest
		));

		navigationLinks.forEach((link) => {
			if (link.hash === `#${currentSection.target.id}`) {
				link.setAttribute('aria-current', 'location');
			} else {
				link.removeAttribute('aria-current');
			}
		});
	}, { threshold: 0, rootMargin: '-20% 0px -65% 0px' });

	trackedSections.forEach((section) => sectionObserver.observe(section));
}
