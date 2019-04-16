import {library, dom} from '@fortawesome/fontawesome-svg-core';

const iconImports = [
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-regular-svg-icons/faCalendarAlt'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-regular-svg-icons/faStar'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faAngleDoubleRight'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faAngleLeft'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faAngleRight'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faArrowLeft'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faArrowRight'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faCameraRetro'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faCaretDown'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faEdit'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faFolder'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faFolderOpen'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faHome'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faLongArrowAltRight'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faMapMarkedAlt'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faSearch'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faStar'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faSync'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faFileAdhoc'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faFilePrpt'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faFileSta'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faFileStd'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faFileWcdf'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faFileXjpivot'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faGlobe'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faHome'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faToolCde'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faToolStagile'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faToolStdashboard'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faToolStpivot'),
	import(/* webpackChunkName: "fa" */ './fontawesome/faToolStreport')
];

(async () => {
	const container = document.createElement('div');
	container.style.display = 'none';
	document.body.append(container);

	const icons = await Promise.all(iconImports);
	icons.forEach(icon => {
		const symbol = document.createElement('i');
		symbol.dataset.faSymbol = `${icon.prefix}-${icon.iconName}`;
		symbol.classList.add(icon.prefix, `fa-${icon.iconName}`, 'fa-fw');
		container.append(symbol);
		library.add(icon.definition);
	});

	dom.i2svg({node: container});
})();
