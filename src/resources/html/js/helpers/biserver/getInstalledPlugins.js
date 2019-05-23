import isStagileInstalled from './plugins/isStagileInstalled';
import isStdashboardInstalled from './plugins/isStdashboardInstalled';
import isStpivotInstalled from './plugins/isStpivotInstalled';
import isStreportInstalled from './plugins/isStreportInstalled';

let installedPluginsPromise = null;

const getInstalledPlugins = async () => {
	// Each checker makes a HEAD request to a known plugin resource.
	const installCheckers = [
		['stagile', isStagileInstalled],
		['stdashboard', isStdashboardInstalled],
		['stpivot', isStpivotInstalled],
		['streport', isStreportInstalled]
	];

	return (await Promise.all(
		installCheckers.map(async ([plugin, isInstalled]) => {
			return (await isInstalled()) ? plugin : undefined;
		})
	)).filter(plugin => typeof plugin === 'string');
};

export default async (useCache = true, ...args) => {
	if (installedPluginsPromise === null || !useCache) {
		installedPluginsPromise = getInstalledPlugins(...args);
	}
	return installedPluginsPromise;
};
