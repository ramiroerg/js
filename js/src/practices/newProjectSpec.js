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


var newItem = {
	"Content": "My New Item",

};


frisby.create('Given I have at least one project')
	.get('https://todo.ly/api/projects.json')

	.afterJSON(function(data){
		expect(data.length).toBeGreaterThan(0); 
	})

		.afterJSON(function(data){
	
		frisby.create('When I create a project')
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

			frisby.create('Get all projects')
			.get('https://todo.ly/api/projects.json')
			.expectJSON('?',{
				Id: data.Id
			})
			.expectStatus(200)
			.toss();

		})

		.afterJSON(function(data){
			var projectId = data.Id;

			frisby.create('Delete test')
			.delete('https://todo.ly/api/projects/'+projectId+'.json')

			.expectStatus(200)
			.toss();

		})



		.toss();

	})

.toss();






