const DURATION: number = 850;

const ease = (t: number): number => {
	return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

export const smoothScrollToTop = (): void => {
	const start: number = window.pageYOffset;
	const startTime: number =
		'now' in window.performance ? window.performance.now() : new Date().getTime();

	const scroll = (): void => {
		const now: number =
			'now' in window.performance ? window.performance.now() : new Date().getTime();
		const time: number = Math.min(1, (now - startTime) / DURATION);
		const timeFunction: number = ease(time);

		window.scroll(0, Math.ceil(timeFunction * (0 - start)) + start);

		if (window.pageYOffset === 0) {
			return;
		}

		requestAnimationFrame(scroll);
	};

	scroll();
};
