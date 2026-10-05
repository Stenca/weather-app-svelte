export function escapeKey(node: HTMLElement, callback: () => void) {
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			callback();
		}
	}
	window.addEventListener('keydown', handleKeydown);

	return {
		destroy() {
			window.removeEventListener('keydown', handleKeydown);
		},
		update(newCallback: () => void) {
			callback = newCallback;
		}
	};
}
