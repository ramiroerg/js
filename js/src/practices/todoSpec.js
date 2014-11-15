var frisby = require('/usr/local/lib/node_modules/frisby');
/*
frisby.globalSetup({
	request: {
		proxy: 'http://www.google.com' //??????
	}
})
*/

frisby.create('Get todo.ly')
	.get('https://todo.ly/api/projects.json'/*, {
		headers: {
			Authorization: 'Basic cmFtaXJvZXJnQGljbG91ZC5jb206c2VjdXJlMTIz'
			}
		}*/)
	.inspectJSON()
	.expectStatus(200)
	.expectJSONTypes({
			ErrorMessage: String,
			ErrorCode: Number
	})
.toss();