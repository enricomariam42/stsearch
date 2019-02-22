import Noty from 'noty';

export const NOTY_DEFAULTS = {
	container: '#noty',
	theme: 'bootstrap-v4',
	timeout: 3000,
	progressBar: true,
	closeWith: ['click']
};

export const noty = {
	alert: text => new Noty({...NOTY_DEFAULTS, type: 'alert', text}).show(),
	success: text => new Noty({...NOTY_DEFAULTS, type: 'success', text}).show(),
	error: text => new Noty({...NOTY_DEFAULTS, type: 'error', text}).show(),
	warning: text => new Noty({...NOTY_DEFAULTS, type: 'warning', text}).show(),
	info: text => new Noty({...NOTY_DEFAULTS, type: 'info', text}).show()
};
