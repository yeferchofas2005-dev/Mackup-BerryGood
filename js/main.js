const loadingDuration = 3_000;
const loaderStorageKey = 'berryGoodLoaderVisto';
const loadingScreen = document.querySelector('.loading-screen');
const progressBar = document.querySelector('.progress-fill');
const progressTrack = document.querySelector('[role="progressbar"]');
const progressValue = document.querySelector('.progress-value');
const startTime = performance.now();

if (window.location.protocol !== 'file:' && window.location.pathname.endsWith('/index.html')) {
	const cleanPath = window.location.pathname.slice(0, -'index.html'.length);
	window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
}

function finishLoading() {
	try {
		sessionStorage.setItem(loaderStorageKey, 'true');
	} catch {}

	loadingScreen.classList.add('is-leaving');
	window.setTimeout(() => loadingScreen.remove(), 250);
}

function updateLoadingProgress(now) {
	const elapsed = now - startTime;
	const progress = Math.min(elapsed / loadingDuration, 1);
	const percent = Math.floor(progress * 100);

	progressBar.style.width = `${percent}%`;
	progressTrack.setAttribute('aria-valuenow', String(percent));
	progressValue.textContent = String(percent);

	if (progress >= 1) {
		finishLoading();
		return;
	}

	window.requestAnimationFrame(updateLoadingProgress);
}

if (document.documentElement.classList.contains('skip-loader')) {
	loadingScreen.remove();
} else {
	window.requestAnimationFrame(updateLoadingProgress);
}
