/**
* Workflow 
* Create project, create item, delete project, find created item (negative)
** Given I don't have a Project
** When I create an item for this project and delete the project
** Then I should get the Item as deleted
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
		frisby.create('Then I should be able to create an item for this Project')
		.post('https://todo.ly/api/items.json',{
			"Content": "Test Item",
			"ProjectId": projectId
		})
		.expectStatus(200)
		.expectJSON({
			"Content": "Test Item"
		})

			.afterJSON(function(data){
				var ItemId = data.Id;
				frisby.create('Then I will delete the project')
				.delete('https://todo.ly/api/projects/'+projectId+'.json')
				.expectStatus(200)

				.afterJSON(function(data){
					frisby.create('Then I will look for the item')
					.get('https://todo.ly/api/items/'+ItemId+'.json')
					.expectJSON({
						"Deleted": true
					})
					.toss();
				})
				.toss();
			})
		.toss();
	})	
.toss();