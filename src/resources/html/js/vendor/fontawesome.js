import { library, dom } from '@fortawesome/fontawesome-svg-core';

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
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faFolder'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faFolderOpen'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faGlobe'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faLink'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faLongArrowAltRight'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faMapMarkedAlt'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faPencilAlt'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faSearch'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faStar'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faSync'),
	import(/* webpackChunkName: "fa" */ '@fortawesome/free-solid-svg-icons/faTasks'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facFileAdhoc'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facFileOther'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facFilePdf'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facFilePrpt'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facFileSta'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facFileStd'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facFileUrl'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facFileWcdf'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facFileXjpivot'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facToolCde'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facToolOther'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facToolStagile'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facToolStdashboard'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facToolStpivot'),
	import(/* webpackChunkName: "fa" */ './fontawesome/facToolStreport'),
	import(/* webpackChunkName: "fa" */ './fontawesome/falGlobe'),
	import(/* webpackChunkName: "fa" */ './fontawesome/farHomeAlt'),
	import(/* webpackChunkName: "fa" */ './fontawesome/fasHomeAlt')
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

	dom.i2svg({ node: container });
})();
