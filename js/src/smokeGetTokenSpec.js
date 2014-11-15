/**
* Smoke Test 
* Generate a user token
** Given a user is logged
** When we ask for a token
** Then this token should be generated
*/

var frisby = require('/usr/local/lib/node_modules/frisby');

frisby.globalSetup({
	request: {
			headers: {
				Authorization: 'Basic cmFtaXJvZXJnQGljbG91ZC5jb206c2VjdXJlMTIz'
			},
			json: true
	}
})

frisby.create('Get User Token')
	.get('https://todo.ly/api/authentication/token.json')
	.expectStatus(200)
	.expectJSONTypes({
		"TokenString": String
	})
.toss();