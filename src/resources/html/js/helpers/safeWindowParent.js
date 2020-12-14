export default (() => {
	try {
		if (typeof window.parent.location.href !== 'undefined') {
			return window.parent;
		}
	} catch (error) {
		// If an exception occurs, it is probably due the same-origin policy.
	}

	return {};
})();
