var frisby = require('/usr/local/lib/node_modules/frisby');

frisby.globalSetup({
	request: {
		proxy: 'http://www.lostiempos.com' //??????
	}
})

frisby.create('Get google landing page')
	.get('http://wwww.google.com')
	.expectStatus(200)
.toss();