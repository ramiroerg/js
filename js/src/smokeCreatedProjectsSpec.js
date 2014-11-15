/**
* Smoke Test
* Default Projects created
** Given a new build deployed
** When I look for projects
** Then I should have at least one
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

frisby.create('Get default created Projects')
	.get('https://todo.ly/api/projects.json')
	.expectStatus(200)
	.afterJSON(function(data){
		expect(data.length).toBeGreaterThan(0); 
	})
.toss();