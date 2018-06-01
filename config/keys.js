if(process.env.NODE_ENV === 'production'){
	//Prod
	module.exports = require('./prod.js');
} else {
	//Dev Env
	module.exports = require('./dev.js');
}