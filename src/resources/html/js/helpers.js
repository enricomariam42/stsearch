import Compressor from 'compressorjs';
import mergeWith from 'lodash/mergeWith';

export const isProduction = process.env.NODE_ENV === 'production';

export const trigger = (type, ref, init = {}) => ref.dispatchEvent(
	new Event(type, {
		bubbles: true,
		cancelable: true,
		composed: true,
		...init
	})
);

export const override = (obj, ...srcs) => {
	return mergeWith(obj, ...srcs, (objValue, srcValue) => {
		if (Array.isArray(objValue)) {
			return srcValue;
		}
	});
};

export const compressImage = async (file, options = {}) => {
	return new Promise((resolve, reject) => {
		/* eslint-disable-next-line no-new */
		new Compressor(file, {
			strict: true,
			checkOrientation: false,
			maxWidth: 512,
			maxHeight: 512,
			quality: 0.4,
			...options,
			success: result => resolve(result),
			error: error => reject(error)
		});
	});
};

export const fileToDataURI = async file => {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener('load', () => resolve(reader.result));
		reader.addEventListener('error', error => reject(error));
	});
};

export const imageToDataURI = file => {
	return compressImage(file).then(file => fileToDataURI(file));
};

export const strToBool = str => str === 'true';
export const strToInt = str => Number.parseInt(str, 10);

export const toLocaleDateTime = str => {
	let date = new Date(str);
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export const formData = {
	objectify: (form, defaultValues = {}) => {
		let obj = defaultValues;

		for (let key of form.keys()) {
			if (key.endsWith('[]')) {
				obj[key.substring(0, key.length - 2)] = form.getAll(key);
			} else {
				obj[key] = form.get(key);
			}
		}

		return obj;
	},
	formify: obj => {
		let form = new FormData();

		Object.entries(obj).forEach(entry => {
			let key = entry[0];
			let value = entry[1];

			if (typeof value === 'string') {
				form.set(key, value);
			} else if (Array.isArray(value)) {
				let arrKey = `${key}[]`;
				value.forEach(arrValue => {
					form.append(arrKey, arrValue);
				});
			} else {
				let objValue = safeJSON.stringify(value, value);
				form.append(key, objValue);
			}
		});

		return form;
	}
};

export const searchParams = {
	parse: (str, defaultValues) => {
		// URLSearchParams and FormData have similar methods.
		return formData.objectify(new URLSearchParams(str), defaultValues);
	},
	stringify: obj => {
		let params = [];

		Object.entries(obj).forEach(entry => {
			let key = entry[0];
			let value = entry[1];

			if (typeof value === 'string') {
				params.push(`${key}=${encodeURIComponent(value)}`);
			} else if (Array.isArray(value)) {
				let arrKey = `${key}[]`;
				value.forEach(arrValue => {
					params.push(`${arrKey}=${encodeURIComponent(arrValue)}`);
				});
			} else {
				let objValue = safeJSON.stringify(value, value);
				params.push(`${key}=${encodeURIComponent(objValue)}`);
			}
		});

		return params.join('&');
	}
};

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
