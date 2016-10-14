'use strict';

const cache = {};

module.exports = {
	port: 8089,
	https: true,
	launch: false,
	ws: {
		open: (ws) => {
			cache.ws = ws;
		},
		message: (data) => {
			cache.ws.send(`reply: ${data}`);
		}
	},
	routes: {
		'GET /xxx': function*(next) {
			this.body = 'hello word';
		}
	}
}