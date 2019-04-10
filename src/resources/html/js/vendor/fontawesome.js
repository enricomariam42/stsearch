import {library, dom} from '@fortawesome/fontawesome-svg-core';

export const icons = [
	/* eslint-disable global-require */
	require('@fortawesome/free-regular-svg-icons/faCalendarAlt'),
	require('@fortawesome/free-regular-svg-icons/faStar'),
	require('@fortawesome/free-solid-svg-icons/faAngleDoubleLeft'),
	require('@fortawesome/free-solid-svg-icons/faAngleDoubleRight'),
	require('@fortawesome/free-solid-svg-icons/faAngleLeft'),
	require('@fortawesome/free-solid-svg-icons/faAngleRight'),
	require('@fortawesome/free-solid-svg-icons/faArrowLeft'),
	require('@fortawesome/free-solid-svg-icons/faArrowRight'),
	require('@fortawesome/free-solid-svg-icons/faCameraRetro'),
	require('@fortawesome/free-solid-svg-icons/faCaretDown'),
	require('@fortawesome/free-solid-svg-icons/faEdit'),
	require('@fortawesome/free-solid-svg-icons/faExternalLinkAlt'),
	require('@fortawesome/free-solid-svg-icons/faFolder'),
	require('@fortawesome/free-solid-svg-icons/faFolderOpen'),
	require('@fortawesome/free-solid-svg-icons/faHome'),
	require('@fortawesome/free-solid-svg-icons/faLongArrowAltLeft'),
	require('@fortawesome/free-solid-svg-icons/faLongArrowAltRight'),
	require('@fortawesome/free-solid-svg-icons/faMapMarkedAlt'),
	require('@fortawesome/free-solid-svg-icons/faSearch'),
	require('@fortawesome/free-solid-svg-icons/faStar'),
	require('@fortawesome/free-solid-svg-icons/faSync'),
	require('./fontawesome/faFileAdhoc'),
	require('./fontawesome/faFilePrpt'),
	require('./fontawesome/faFileSta'),
	require('./fontawesome/faFileStd'),
	require('./fontawesome/faFileWcdf'),
	require('./fontawesome/faFileXjpivot'),
	require('./fontawesome/faHome'),
	require('./fontawesome/faToolCde'),
	require('./fontawesome/faToolStagile'),
	require('./fontawesome/faToolStdashboard'),
	require('./fontawesome/faToolStpivot'),
	require('./fontawesome/faToolStreport')
	/* eslint-enable */
];

export const container = document.createElement('div');
container.style.display = 'none';
document.body.append(container);

icons.forEach(icon => {
	library.add(icon.definition);
	const symbol = document.createElement('i');
	symbol.dataset.faSymbol = `${icon.prefix}-${icon.iconName}`;
	symbol.classList.add(icon.prefix, `fa-${icon.iconName}`, 'fa-fw');
	container.append(symbol);
});

dom.i2svg({node: container});
