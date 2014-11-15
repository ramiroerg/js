/**
* Workflow 
* Get items using filters for custom Project (negative)
** Given I create a Parent Project with 2 Items
** When I try to retrieve the data using filters for the parent Project
** Then I should get an error
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
	"Content": "Parent Project",
	"Icon": 5
};

frisby.create('Given I don’t have a Project, Create a new Project')
	.post('https://todo.ly/api/projects.json',newProject)
	.expectStatus(200)
	.expectJSON({
		"Content": "Parent Project",
		"Icon": 5
	})
	.expectJSONTypes({
		"Content": String,
		"Icon":Number
	})
	.afterJSON(function(data){
		var projectId = data.Id;
		frisby.create('Then I should be able to create a Item for this Project')
		.post('https://todo.ly/api/items.json',{
			"Content": "First Item",
			"ProjectId": projectId
		})
		.expectStatus(200)
		.expectJSON({
			"Content": "First Item"
		})
		.afterJSON(function(data){
			frisby.create('Then I should be able to create a Second Item for this Project')
			.post('https://todo.ly/api/items.json',{
				"Content": "Second Item",
				"ProjectId": projectId
			})
			.expectStatus(200)
			.expectJSON({
				"Content": "Second Item"
			})
			.afterJSON(function(data){
				frisby.create('Then I should not be able to get these items using filters')
				.get('https://todo.ly/api/filters/'+projectId+'/items.json')
				.expectStatus(200)
				.expectJSON({
					"ErrorMessage": "Invalid Id",
  					"ErrorCode": 301
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
	})	
.toss();