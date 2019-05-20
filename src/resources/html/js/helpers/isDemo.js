const ENV = process.env.APP_ENV;
const DEMO_HOSTNAME = process.env.APP_DEMO_HOSTNAME || 'demo.stratebi.com';
export default ENV === 'demo' || DEMO_HOSTNAME === window.location.hostname;
