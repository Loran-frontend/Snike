import { useEffect, useRef } from 'react';

export function usePersistentTimer(
	callback: () => void,
	delay: number,
	offTimer?: boolean
) {
	const savedCallback = useRef(callback);

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		if (offTimer) {
			return;
		}

		function tick() {
			savedCallback.current();
		}

		const id = setInterval(tick, delay);

		return () => clearInterval(id);
	}, [delay, offTimer]);
}
