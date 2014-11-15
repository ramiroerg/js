/**
* Workflow 
* Create a Project and add a sub Project
** Given I don't have a Project
** When I create a Project and I create a Sub Project
** Then this Sub Project should have a ParentId greater than 0
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
		frisby.create('Then I should be able to create a new Project')
		.post('https://todo.ly/api/projects.json',{
			"Content": "Child Project"
		})
		
		.expectStatus(200)
		.expectJSON({
			"Content": "Child Project"
		})

		.afterJSON(function(data){
			var childProjectId = data.Id;
			frisby.create('Then I should be able to upadete this project to a Sub Project')
			.put('https://todo.ly/api/projects/'+childProjectId+'.json',{
				"ParentId": projectId,
				"ItemOrder": 1
			})
			.afterJSON(function(data){
				expect(data.ParentId).toBeGreaterThan(0); 
				expect(data.ParentId).toBe(projectId); 
				expect(data.Id).toBe(childProjectId); 
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
	})	


.toss();