/**
* Workflow 
* Create a Project and then add an Item
** Given I don't have a Project
** When I create a Project and I create an Item
** Then I should have one Item as ItemsCount
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
			frisby.create('Then I should get Project ItemsCount as 1')
			.get('https://todo.ly/api/projects/'+projectId+'.json')
			.afterJSON(function(data){
				expect(data.ItemsCount).toBe(1); 
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