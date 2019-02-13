import {library, dom} from '@fortawesome/fontawesome-svg-core';

// Icons should be imported individually to keep bundle size down.
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons/faAngleRight';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faHome} from '@fortawesome/free-solid-svg-icons/faHome';
import {faStar} from '@fortawesome/free-solid-svg-icons/faStar';
library.add(faAngleDoubleLeft);
library.add(faAngleDoubleRight);
library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faEdit);
library.add(faHome);
library.add(faStar);

// Execute SVG replacement.
dom.watch();
