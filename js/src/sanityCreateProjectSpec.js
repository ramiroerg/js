/**
* Sanity Test
* Create a Project
** Given I don't have any project
** When I create a project "Test Project"
** Then I should get an String with the same name
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
	"Content": "Test Project"
};

frisby.create('Create a new Project')
	.post('https://todo.ly/api/projects.json',newProject)
	.expectStatus(200)
	.expectJSON({
			"Content": "Test Project"
	})
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