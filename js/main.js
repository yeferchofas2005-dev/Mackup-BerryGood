const loadingDuration = 10_000;
const destination = 'html/berryGoodhtml/indexBerryGood.html';
const progressBar = document.querySelector('.progress-fill');
const progressTrack = document.querySelector('[role="progressbar"]');
const progressValue = document.querySelector('.progress-value');
const startTime = performance.now();

function updateLoadingProgress(now) {
	const elapsed = now - startTime;
	const progress = Math.min(elapsed / loadingDuration, 1);
	const percent = Math.floor(progress * 100);

	progressBar.style.width = `${percent}%`;
	progressTrack.setAttribute('aria-valuenow', String(percent));
	progressValue.textContent = String(percent);

	if (progress >= 1) {
		window.location.replace(destination);
		return;
	}

	window.requestAnimationFrame(updateLoadingProgress);
}

window.requestAnimationFrame(updateLoadingProgress);
