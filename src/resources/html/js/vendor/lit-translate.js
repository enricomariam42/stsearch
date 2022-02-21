import { registerTranslateConfig, use } from '@appnest/lit-translate';

import getLocale from '../helpers/biserver/getLocale';
import ca from '../../locales/ca.json';
import en from '../../locales/en.json';
import es from '../../locales/es.json';
import pt from '../../locales/pt.json';

const defaultLocale = 'en';
const navigatorLocale = navigator.language.slice(0, 2);
const availableLocales = {
	/* eslint-disable camelcase */
	ca,
	ca_AD: ca,
	ca_ES: ca,
	ca_FR: ca,
	ca_IT: ca,
	en,
	en_AG: en,
	en_AU: en,
	en_BW: en,
	en_CA: en,
	en_DK: en,
	en_GB: en,
	en_HK: en,
	en_IE: en,
	en_IL: en,
	en_IN: en,
	en_NG: en,
	en_NZ: en,
	en_PH: en,
	en_SC: en,
	en_SG: en,
	en_US: en,
	en_ZA: en,
	en_ZM: en,
	en_ZW: en,
	es,
	es_AR: es,
	es_BO: es,
	es_CL: es,
	es_CO: es,
	es_CR: es,
	es_CU: es,
	es_DO: es,
	es_EC: es,
	es_ES: es,
	es_GT: es,
	es_HN: es,
	es_MX: es,
	es_NI: es,
	es_PA: es,
	es_PE: es,
	es_PR: es,
	es_PY: es,
	es_SV: es,
	es_US: es,
	es_UY: es,
	es_VE: es,
	pt,
	pt_BR: pt,
	pt_PT: pt,
	/* eslint-enable */
};

registerTranslateConfig({
	loader: (locale) => {
		document.documentElement.lang = availableLocales[locale].__meta__.lang;
		document.documentElement.dir = availableLocales[locale].__meta__.dir;
		return availableLocales[locale];
	},
});

use(defaultLocale);

getLocale().then((biserverLocale) => {
	let locale = defaultLocale;
	if (biserverLocale in availableLocales) {
		locale = biserverLocale;
	} else if (navigatorLocale in availableLocales) {
		locale = navigatorLocale;
	}
	if (locale !== defaultLocale) {
		use(locale);
	}
});
