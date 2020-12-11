export default (() => {
	try {
		return window.parent;
	} catch (error) {
		return {};
	}
})();
