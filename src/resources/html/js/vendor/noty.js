import Noty from 'noty';

export const NOTY_DEFAULTS = {
	container: '#noty',
	theme: 'bootstrap-v4',
	timeout: 1000,
	progressBar: true,
	closeWith: ['click']
};

export const noty = {
	alert: (text, config) => new Noty({...NOTY_DEFAULTS, ...config, type: 'alert', text}).show(),
	success: (text, config) => new Noty({...NOTY_DEFAULTS, ...config, type: 'success', text}).show(),
	error: (text, config) => new Noty({...NOTY_DEFAULTS, ...config, type: 'error', text}).show(),
	warning: (text, config) => new Noty({...NOTY_DEFAULTS, ...config, type: 'warning', text}).show(),
	info: (text, config) => new Noty({...NOTY_DEFAULTS, ...config, type: 'info', text}).show()
};
