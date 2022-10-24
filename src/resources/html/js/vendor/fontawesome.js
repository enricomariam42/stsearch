import { library, dom } from '@fortawesome/fontawesome-svg-core';

(async () => {
	const container = document.createElement('div');
	container.style.display = 'none';
	document.body.append(container);

	const icons = await Promise.all([
		import(/* webpackMode: "eager" */ '@fortawesome/free-regular-svg-icons/faCalendarDays'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-regular-svg-icons/faHeart'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faAngleLeft'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faAngleRight'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faAnglesLeft'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faAnglesRight'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faArrowLeft'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faArrowRight'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faArrowsRotate'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faCameraRetro'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faCaretDown'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faFolder'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faFolderOpen'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faGlobe'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faHeart'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faLeftLong'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faLink'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faList'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faListCheck'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faMapLocationDot'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faPencil'),
		import(/* webpackMode: "eager" */ '@fortawesome/free-solid-svg-icons/faRightLong'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileAdhoc'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileCsv'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileOther'),
		import(/* webpackMode: "eager" */ './fontawesome/facFilePdf'),
		import(/* webpackMode: "eager" */ './fontawesome/facFilePrpt'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileSaiku'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileSta'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileStd'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileStp'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileStolap'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileUrl'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileWcdf'),
		import(/* webpackMode: "eager" */ './fontawesome/facFileXjpivot'),
		import(/* webpackMode: "eager" */ './fontawesome/facGlobeOutline'),
		import(/* webpackMode: "eager" */ './fontawesome/facHomeOutline'),
		import(/* webpackMode: "eager" */ './fontawesome/facHomeSolid'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolCde'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolOther'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolSaiku'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolStagile'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolStdashboard'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolStolap'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolStpanels'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolStpivot'),
		import(/* webpackMode: "eager" */ './fontawesome/facToolStreport'),
	]);

	icons.forEach((icon) => {
		const symbol = document.createElement('i');
		symbol.dataset.faSymbol = `${icon.prefix}-${icon.iconName}`;
		symbol.classList.add(icon.prefix, `fa-${icon.iconName}`, 'fa-fw');
		container.append(symbol);
		library.add(icon.definition);
	});

	dom.i2svg({ node: container });
})();
