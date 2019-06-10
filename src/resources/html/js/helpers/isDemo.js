const ENV = process.env.APP_ENV;
export default ENV === 'demo'
	|| window.location.hostname === 'demo.stratebi.com'
	|| window.location.hostname === 'local.demo.stratebi.com';
