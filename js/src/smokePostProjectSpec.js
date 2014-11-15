/**
* Smoke Test 
* Create a new Project
** Given I don't have any Project
** When I create a new Project
** Then I should get a code 200 
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

var newProject = {
	"Content": "My New Project"
};

frisby.create('Create a new Project')
	.post('https://todo.ly/api/projects.json',newProject)
	.expectStatus(200)
	.expectJSONTypes({
			"Content": String
	})

	.afterJSON(function(data){
			var projectId = data.Id;
			frisby.create('Delete test project')
			.delete('https://todo.ly/api/projects/'+projectId+'.json')
			.expectStatus(200)
	.toss();
	})

.toss();