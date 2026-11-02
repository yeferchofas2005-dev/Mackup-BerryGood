(() => {
	const themeStorageKey = 'berryGoodTheme';
	const themeColors = { dark: '#111318', light: '#f5f7f2' };
	const root = document.documentElement;
	const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

	function getSavedTheme() {
		try {
			const savedTheme = localStorage.getItem(themeStorageKey);
			return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
		} catch {
			return null;
		}
	}

	function saveTheme(theme) {
		try {
			localStorage.setItem(themeStorageKey, theme);
		} catch {}
	}

	function getDeviceTheme() {
		return darkModeQuery.matches ? 'dark' : 'light';
	}

	function updateThemeButtons(theme) {
		const label = theme === 'dark' ? 'Cambiar a modo día' : 'Cambiar a modo noche';

		document.querySelectorAll('.theme-toggle').forEach((button) => {
			button.setAttribute('aria-label', label);
			button.title = label;
		});
	}

	function applyTheme(theme) {
		root.dataset.theme = theme;
		document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[theme]);
		updateThemeButtons(theme);
	}

	applyTheme(getSavedTheme() ?? getDeviceTheme());

	darkModeQuery.addEventListener('change', () => {
		if (!getSavedTheme()) {
			applyTheme(getDeviceTheme());
		}
	});

	document.addEventListener('DOMContentLoaded', () => {
		updateThemeButtons(root.dataset.theme);

		document.querySelectorAll('.theme-toggle').forEach((button) => {
			button.addEventListener('click', () => {
				const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
				saveTheme(nextTheme);
				applyTheme(nextTheme);
			});
		});
	});
})();
