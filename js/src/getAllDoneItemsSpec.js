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
	"Content": "Frisby Test Project",
	"Icon":3

};


frisby.create('Given I have a project with done and not done items')
	.post('https://todo.ly/api/projects.json', newProject)
	.expectStatus(200)
	.expectJSON({
		Content: "Frisby Test Project"
	})
	.expectJSONTypes({
		"Content": String,
		"Id":Number
	})

	.afterJSON(function(data){
		var projectId = data.Id;

		frisby.create('And I create a first item')
		.post('https://todo.ly/api/items.json', {
			"Content": "My New Item",
			"ProjectId": projectId,
			"Checked":true
			})
		.expectStatus(200)
		.toss();

		frisby.create('And I create a second item')
		.post('https://todo.ly/api/items.json', {
			"Content": "My Second Item",
			"ProjectId": projectId,
			"Checked":false
			})

		.expectStatus(200)
		.toss();


		frisby.create('And I create a third item')
		.post('https://todo.ly/api/items.json', {
			"Content": "My Third Item",
			"ProjectId": projectId,
			"Checked":true
			})

		.expectStatus(200)
		.toss();

		frisby.create('Get active items')
		.get('https://todo.ly/api/projects/' + projectId + '/items.json')
		.expectStatus(200)
		.afterJSON(function(data){
			expect(data.length).toBe(1); 
		})
		.toss();


		frisby.create('Get done items')
		.get('https://todo.ly/api/projects/' + projectId + '/doneitems.json')
		.expectStatus(200)
		.afterJSON(function(data){
			expect(data.length).toBe(2); 
		})
		.toss();


		frisby.create('Delete test')
		.delete('https://todo.ly/api/projects/'+projectId+'.json')
		.expectStatus(200)
		.toss();

	})
.toss();
