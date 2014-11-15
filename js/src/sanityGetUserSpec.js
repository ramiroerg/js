/**
* Sanity Test
* Get logged user information
** Given a user logged
** When I look for the user
** Then his information should be returned 
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

frisby.create('Get User information')
	.get('https://todo.ly/api/user.json')
	.expectStatus(200)
	.expectJSONTypes({
		"Id": Number,
  		"Email": String, 
  		"FullName": String 
	})

.toss();