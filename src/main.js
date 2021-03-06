/*jshint esversion: 6 */

const conman = require('./container-manager.js');
const httpsHelper = require('./include/container-manger-https-helper');

let containerMangerUIServer = null;

httpsHelper.init()
	.then(() => {
		conman.setHttpsHelper(httpsHelper);
		return conman.connect();
	})
	.then(() => {
		//require here so env vars are set!
		containerMangerUIServer = require('./server.js');
		//set up the arbiter proxy
		containerMangerUIServer.proxies['arbiter'] = 'arbiter:8080';

		console.log("Starting UI Server!!");
		return containerMangerUIServer.launch(conman);
	})
	.catch(err => {
		console.log(err);
		const stack = new Error().stack;
		console.log(stack);
	});
