/**
* Workflow 
* Create a Project add an item and mark it as done
** Given I don't have a Project
** When I create a Project and I create an Item and mark it done
** Then Checked parameter should be True
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
			var itemId = data.Id;
			frisby.create('Then I should mark this item as done')
			.put('https://todo.ly/api/items/'+itemId+'.json',{
				"Checked": true
			})
			.expectStatus(200)
			.expectJSON({
				"Checked": true
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