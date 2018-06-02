if(process.env.NODE_ENV === 'production'){
	//Prod
	module.exports = require('./prod');
} else {
	//Dev Env
	module.exports = require('./dev');
}