var frisby = require('/usr/local/lib/node_modules/frisby');
/*
frisby.globalSetup({
	request: {
		proxy: 'http://www.google.com' //??????
	}
})
*/

var request = {
			headers: {
				Authorization: 'Basic cmFtaXJvZXJnQGljbG91ZC5jb206c2VjdXJlMTIz'
			},
			json: true
};


var newProject = {
	"Content": "My New Project",
	"Icon":4

};



frisby.create('Get todo.ly')
	.post('https://todo.ly/api/projects.json', newProject, request)
	.inspectJSON()
	.expectStatus(200)
	.expectJSON({
		Content: "My New Project"
	})
	.expectJSONTypes({
			Id: Number,
	})
	.afterJSON(function(data){
		var ProjectId = data.Id;
		var newItem = {"Content": "My New Task3",
				"ProjectId":ProjectId};

		frisby.create('Get todo.ly')
			.post('https://todo.ly/api/items.json', 
				newItem, 
				request)
			.inspectJSON()
			.expectStatus(200)
			.expectJSON({
				"Content": "My New Task3",
				"ProjectId":data.Id
			})
			.expectJSONTypes({
				"Content": String,
				"ProjectId":Number
			})

		.toss();

	})
.toss();





//TAREA revisar .afterJASON(function(data)){

//})