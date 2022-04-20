import { registerTranslateConfig, use } from '@appnest/lit-translate';

import getLocale from '../helpers/biserver/getLocale';
import ar from '../../locales/ar.json';
import ca from '../../locales/ca.json';
import en from '../../locales/en.json';
import es from '../../locales/es.json';
import ko from '../../locales/ko.json';
import pt from '../../locales/pt.json';

const navigatorLocale = navigator.language.slice(0, 2).toLowerCase();
const defaultLocale = 'en';
const messages = { ar, ca, en, es, ko, pt };

registerTranslateConfig({
	loader: (locale) => {
		document.documentElement.lang = messages[locale]?.__meta__?.lang;
		document.documentElement.dir = messages[locale]?.__meta__?.dir;
		return messages[locale];
	},
});

use(defaultLocale);
getLocale().then((biserverLocale) => {
	biserverLocale = biserverLocale.slice(0, 2).toLowerCase();
	if (biserverLocale in messages) {
		use(biserverLocale);
	} else if (navigatorLocale in messages) {
		use(navigatorLocale);
	}
});
