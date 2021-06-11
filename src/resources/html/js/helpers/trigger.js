export default (type, ref, init = {}) => ref.dispatchEvent(
	new Event(type, {
		bubbles: true,
		cancelable: true,
		composed: true,
		...init,
	}),
);
