import mergeWith from 'lodash/mergeWith';

export default (obj, ...srcs) => {
	return mergeWith(obj, ...srcs, (objValue, srcValue) => {
		if (Array.isArray(objValue)) {
			return srcValue;
		}

		return undefined;
	});
};
