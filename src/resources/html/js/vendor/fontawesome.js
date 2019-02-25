import {library, dom} from '@fortawesome/fontawesome-svg-core';

export const icons = [
	require('./fontawesome-extra/fa-file-adhoc'),
	require('./fontawesome-extra/fa-file-prpt'),
	require('./fontawesome-extra/fa-file-sta'),
	require('./fontawesome-extra/fa-file-std'),
	require('./fontawesome-extra/fa-file-wcdf'),
	require('./fontawesome-extra/fa-file-xjpivot'),
	require('./fontawesome-extra/fa-tool-cde'),
	require('./fontawesome-extra/fa-tool-stagile'),
	require('./fontawesome-extra/fa-tool-stdashboard'),
	require('./fontawesome-extra/fa-tool-stpivot'),
	require('./fontawesome-extra/fa-tool-streport'),
	require('@fortawesome/free-regular-svg-icons/faCalendarAlt'),
	require('@fortawesome/free-regular-svg-icons/faImage'),
	require('@fortawesome/free-regular-svg-icons/faStar'),
	require('@fortawesome/free-solid-svg-icons/faAngleDoubleLeft'),
	require('@fortawesome/free-solid-svg-icons/faAngleDoubleRight'),
	require('@fortawesome/free-solid-svg-icons/faAngleLeft'),
	require('@fortawesome/free-solid-svg-icons/faAngleRight'),
	require('@fortawesome/free-solid-svg-icons/faArrowLeft'),
	require('@fortawesome/free-solid-svg-icons/faArrowRight'),
	require('@fortawesome/free-solid-svg-icons/faEdit'),
	require('@fortawesome/free-solid-svg-icons/faExternalLinkAlt'),
	require('@fortawesome/free-solid-svg-icons/faFolder'),
	require('@fortawesome/free-solid-svg-icons/faHome'),
	require('@fortawesome/free-solid-svg-icons/faLongArrowAltLeft'),
	require('@fortawesome/free-solid-svg-icons/faLongArrowAltRight'),
	require('@fortawesome/free-solid-svg-icons/faMapMarkedAlt'),
	require('@fortawesome/free-solid-svg-icons/faSearch'),
	require('@fortawesome/free-solid-svg-icons/faStar'),
	require('@fortawesome/free-solid-svg-icons/faSync')
];

export const container = document.createElement('div');
container.style.display = 'none';
document.body.append(container);

icons.forEach(icon => {
	library.add(icon.definition);
	let symbol = document.createElement('i');
	symbol.dataset.faSymbol = `${icon.prefix}-${icon.iconName}`;
	symbol.classList.add(icon.prefix, `fa-${icon.iconName}`, 'fa-fw');
	container.append(symbol);
});

dom.i2svg({node: container});
