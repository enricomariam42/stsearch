import { registerTranslateConfig, use } from '@appnest/lit-translate';

import getLocale from '../helpers/biserver/getLocale';
import en from '../../locales/en.json';
import es from '../../locales/es.json';
import pt from '../../locales/pt.json';
import ca from '../../locales/ca.json';

const defaultLocale = 'en';
const navigatorLocale = navigator.language.slice(0, 2);
// eslint-disable-next-line camelcase
const availableLocales = { en, es, pt, pt_PT: pt, ca };

registerTranslateConfig({
	loader: (locale) => availableLocales[locale],
});

use(defaultLocale);
document.documentElement.lang = defaultLocale;

getLocale().then((biserverLocale) => {
	let locale = defaultLocale;
	if (biserverLocale in availableLocales) {
		locale = biserverLocale;
	} else if (navigatorLocale in availableLocales) {
		locale = navigatorLocale;
	}
	if (locale !== defaultLocale) {
		use(locale);
		document.documentElement.lang = locale;
	}
});
