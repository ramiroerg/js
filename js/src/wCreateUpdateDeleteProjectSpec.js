/**
* Workflow 
* Create, Update, Delete Project
** Given I don't have a Project
** When I create a Project
** Then I should be able to update the Project, verify the changes and Delete the project
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
	"Content": "Test Project",
	"Icon": 5
};

frisby.create('Given I don’t have a Project, Create a new Project')
	.post('https://todo.ly/api/projects.json',newProject)
	.expectStatus(200)
	.expectJSON({
			"Content": "Test Project",
			"Icon": 5
	})
	.expectJSONTypes({
			"Content": String,
			"Icon":Number
	})
	.afterJSON(function(data){
			var projectId = data.Id;
			frisby.create('Then I should be able to update the Project')
			.put('https://todo.ly/api/projects/'+projectId+'.json',{
				"Content": "Updated Test Project",
				"Icon": 4
			})
			.expectStatus(200)
			.expectJSON({
				"Content": "Updated Test Project",
				"Icon": 4
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