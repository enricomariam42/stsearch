export const isProduction = process.env.NODE_ENV === 'production';

export const trigger = (type, ref, init = {}) => ref.dispatchEvent(
	new Event(type, {
		bubbles: true,
		cancelable: true,
		composed: true,
		...init
	})
);

export const toLocaleDateTime = str => {
	let date = new Date(str);
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export const formDataToMap = formData => {
	let formMap = new Map();

	for (let key of formData.keys()) {
		let value;

		if (key.endsWith('[]')) {
			value = formData.getAll(key);
			key = key.substring(0, key.length - 2);
		} else {
			value = formData.get(key);
		}

		formMap.set(key, value);
	}

	return formMap;
};

export const objToSearchParams = obj => new URLSearchParams(obj).toString();

export const safeJSON = {
	parse: (str, defaultValue = null) => {
		try {
			return JSON.parse(str);
		} catch (error) {
			console.error(error, str);
		}

		return defaultValue;
	},
	stringify: (obj, defaultValue = null) => {
		try {
			return JSON.stringify(obj);
		} catch (error) {
			console.error(error, obj);
		}

		return defaultValue;
	}
};
