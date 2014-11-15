var frisby = require('/usr/local/lib/node_modules/frisby');

frisby.globalSetup({
	request: {

			json: true
	}
})

var newUser = {
	"Email": "WrongMailAdress",
	"FullName": "My User",
	"Password":"myPassword"

};


frisby.create('Given I create a user with invalid mail address')
	.post('https://todo.ly/api/user.json', newUser)
		.expectStatus(200)
		.expectJSON({
			ErrorMessage: 'Invalid Email Address',
			ErrorCode: 307
		})

.toss();
