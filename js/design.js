(() => {
	const designStorageKey = 'berryGoodDesign';
	const root = document.documentElement;
	const scriptBase = document.currentScript?.src.replace(/design\.js(\?.*)?$/, '') ?? 'js/';
	const gsapSources = [
		'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
	];
	let newDesignReady = null;

	function getSavedDesign() {
		try {
			// El diseño nuevo es el predeterminado; el anterior solo si la persona lo eligió
			return localStorage.getItem(designStorageKey) === 'actual' ? 'actual' : 'nuevo';
		} catch {
			return 'nuevo';
		}
	}

	function saveDesign(design) {
		try {
			localStorage.setItem(designStorageKey, design);
		} catch {}
	}

	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = resolve;
			script.onerror = reject;
			document.head.append(script);
		});
	}

	async function prepareNewDesign() {
		if (!newDesignReady) {
			newDesignReady = (async () => {
				for (const src of gsapSources) {
					await loadScript(src).catch(() => {});
				}
				await loadScript(`${scriptBase}berryGoodjs/mainBerryGoodNuevo.js`);
			})();
		}

		await newDesignReady;
		window.BerryGoodNuevo?.start();
	}

	function updateDesignButtons(design) {
		const isNew = design === 'nuevo';
		const label = isNew ? 'Volver a la versión anterior' : 'Ver diseño nuevo';

		document.querySelectorAll('.design-toggle').forEach((button) => {
			button.setAttribute('aria-pressed', String(isNew));
			button.setAttribute('aria-label', label);
			button.title = label;
		});
	}

	function applyDesign(design) {
		root.dataset.design = design;
		updateDesignButtons(design);
	}

	// Enlace para compartir: ?diseno=nuevo o ?diseno=actual
	const requestedDesign = new URLSearchParams(window.location.search).get('diseno');

	if (requestedDesign === 'nuevo' || requestedDesign === 'actual') {
		saveDesign(requestedDesign);
	}

	applyDesign(requestedDesign === 'nuevo' || requestedDesign === 'actual' ? requestedDesign : getSavedDesign());

	document.addEventListener('DOMContentLoaded', () => {
		updateDesignButtons(root.dataset.design);

		if (root.dataset.design === 'nuevo') {
			prepareNewDesign();
		}

		document.querySelectorAll('.design-toggle').forEach((button) => {
			button.addEventListener('click', () => {
				const nextDesign = root.dataset.design === 'nuevo' ? 'actual' : 'nuevo';
				saveDesign(nextDesign);
				applyDesign(nextDesign);
				window.scrollTo({ top: 0, behavior: 'instant' });

				if (nextDesign === 'nuevo') {
					prepareNewDesign();
				} else {
					window.BerryGoodNuevo?.stop();
				}

				const visibleButton = [...document.querySelectorAll('.design-toggle')]
					.find((candidate) => candidate.offsetParent !== null);
				visibleButton?.focus({ preventScroll: true });
			});
		});
	});
})();
