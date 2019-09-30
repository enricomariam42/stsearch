import { library, dom } from '@fortawesome/fontawesome-svg-core';

export const faIcons = new Set();

(async () => {
	const container = document.createElement('div');
	container.style.display = 'none';
	document.body.append(container);

	const icons = await Promise.all([
		import(/* webpackMode: "eager" */ '@fortawesome/free-regular-svg-icons/faCalendarAlt'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-regular-svg-icons/faStar'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faAngleDoubleRight'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faAngleLeft'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faAngleRight'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faArrowLeft'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faArrowRight'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faCameraRetro'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faCaretDown'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faFolder'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faFolderOpen'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faGlobe'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faLink'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faLongArrowAltRight'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faMapMarkedAlt'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faPencilAlt'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faSearch'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faStar'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faSync'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faTasks'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileAdhoc'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileCsv'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileOther'),
		import(/* webpackMode: "eager" */ './fontawesome/facFilePdf'),
		import(/* webpackMode: "eager" */ './fontawesome/facFilePrpt'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileSta'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileStd'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileUrl'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileWcdf'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileXjpivot'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolCde'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolOther'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolStagile'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolStdashboard'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolStpivot'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolStreport'),
		import(/* webpackMode: "eager" */ './fontawesome/falGlobe'),
		import(/* webpackMode: "eager" */ './fontawesome/farHomeAlt'),
		import(/* webpackMode: "eager" */ './fontawesome/fasHomeAlt')
	]);

	icons.forEach(icon => {
		const symbol = document.createElement('i');
		symbol.dataset.faSymbol = `${icon.prefix}-${icon.iconName}`;
		symbol.classList.add(icon.prefix, `fa-${icon.iconName}`, 'fa-fw');
		container.append(symbol);
		library.add(icon.definition);
	});

	// Populate list of available icons.
	Object.entries(library.definitions).forEach(([p, i]) => {
		Object.keys(i).forEach(n => {
			faIcons.add(`${p}-${n}`);
		});
	});

	dom.i2svg({ node: container });
})();
