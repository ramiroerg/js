/**
* Sanity Test
* Update Project Name
** Given I create one project
** When I update the name of the project
** Then the name should be updated
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
			frisby.create('Update test project')
			.put('https://todo.ly/api/projects/'+projectId+'.json',{
				"Content": "Updated Test Project"
			})
			.expectStatus(200)
			.expectJSON({
				"Content": "Updated Test Project"
			})
			
			.afterJSON(function(data){
				frisby.create('Delete test project')
				.delete('https://todo.ly/api/projects/'+projectId+'.json')
				.expectStatus(200)
				.toss();
			})
			.toss();
	})	
.toss();