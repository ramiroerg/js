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
	"Content": "My New Project",
	"Icon":1

};


var newItem = {
	"Content": "My New Item",

};


frisby.create('Given I do not have any projects created')
	.get('https://todo.ly/api/projects.json')

	
		.afterJSON(function(data){
		var ProjectId = data.Id;

		frisby.create('When I create a project')
		.post('https://todo.ly/api/projects.json', newProject)
		.inspectJSON()
		.expectStatus(200)
		.expectJSON({
			Content: "My New Project"
		})
		.expectJSONTypes({
			"Content": String,
			"Id":Number
		})


		.afterJSON(function(data){
			var projectId = data.Id;

			frisby.create('And I create a first items')
			.post('https://todo.ly/api/items.json', {
				"Content": "My New Item",
				"ProjectId": projectId

				})

			.expectJSON({
				ProjectId: data.Id
			})
			
			.expectStatus(200)
			.toss();

			frisby.create('And I create a second items')
			.post('https://todo.ly/api/items.json', {
				"Content": "My Second Item",
				"ProjectId": projectId

				})

			.expectJSON({
				ProjectId: data.Id
			})
			.expectStatus(200)
			.toss();


			frisby.create('Get all items')
			.get('https://todo.ly/api/projects/' + projectId + '/items.json')

			.inspectJSON()
			.expectJSON('*',{
				ProjectId: data.Id
			})
			.expectStatus(200)
			.toss();



		})


		.toss();

	})

.toss();






