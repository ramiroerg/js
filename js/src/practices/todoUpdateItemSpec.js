var frisby = require('/usr/local/lib/node_modules/frisby');
frisby.globalSetup({
	request: {
		headers: {
			Authorization: 'Basic cmFtaXJvZXJnQGljbG91ZC5jb206c2VjdXJlMTIz'
		},
			json: true
			//inspectOnFailure: true

	}
})

var newProject = {
	"Content": "My Project",
	"Icon":4

};



frisby.create('Create a Project')
	.post('https://todo.ly/api/projects.json', newProject)
	.inspectJSON()
	.expectStatus(200)
	.expectJSON({
		Content: "My Project"
	})
	.expectJSONTypes({
			Id: Number,
	})
	.afterJSON(function(data){
		var ProjectId = data.Id;

		var newProject = {
			"Content": "My UPDATED Project",
			"Icon":6
		};

		frisby.create('Update Project')
			.put('https://todo.ly/api/projects/' +data.Id+'.json', 
				newProject)
			.inspectJSON()
			.expectStatus(200)
			.expectJSON({
				"Content": "My UPDATED Project",
				"Id":data.Id
			})
			.expectJSONTypes({
				"Content": String,
				"Id":Number
			})

					.afterJSON(function(data){
					var ProjectId = data.Id;

					frisby.create('Delete Project')
					.delete('https://todo.ly/api/projects/' +data.Id+'.json', {})
					.inspectJSON()
					.expectStatus(200)
					.expectJSON({
						"Content": "My UPDATED Project",
						"Id":data.Id
					})
					.expectJSONTypes({
						"Content": String,
						"Id":Number
					})

					.toss();

					})
		.toss();

	})

.toss();





//TAREA revisar .afterJASON(function(data)){

//})