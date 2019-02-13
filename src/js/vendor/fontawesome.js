import {library, dom} from '@fortawesome/fontawesome-svg-core';

// Icons should be imported individually to keep bundle size down.
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons/faAngleRight';
import {faCalendarAlt} from '@fortawesome/free-regular-svg-icons/faCalendarAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons/faLongArrowAltLeft';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons/faLongArrowAltRight';
import {faSTAgile} from './fontawesome-extra/fa-stagile.js';
import {faSTDashboard} from './fontawesome-extra/fa-stdashboard.js';
import {faSTPivot} from './fontawesome-extra/fa-stpivot.js';
import {faSTReport} from './fontawesome-extra/fa-streport.js';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faStar} from '@fortawesome/free-solid-svg-icons/faStar';
library.add(faAngleDoubleLeft);
library.add(faAngleDoubleRight);
library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faCalendarAlt);
library.add(faEdit);
library.add(faHome);
library.add(faLongArrowAltLeft);
library.add(faLongArrowAltRight);
library.add(faSTAgile);
library.add(faSTDashboard);
library.add(faSTPivot);
library.add(faSTReport);
library.add(faSearch);
library.add(faStar);

// Execute SVG replacement.
dom.watch();
