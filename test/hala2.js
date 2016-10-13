module.exports = {
	port: 8089,
	https: false,
	launch: false,
	routes: {
		'GET /xxx': function*(next) {
			this.body = 'hello word';
		}
	}
}