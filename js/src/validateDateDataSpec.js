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
	"Icon":2

};

now = new Date();
milSecs = now.getTime();
myDate = "/Date(" + milSecs + ")/";

frisby.create('Given I have a project created in my account')
	.post('https://todo.ly/api/projects.json', newProject)
	.expectStatus(200)
	.expectJSON({
		Content: "Frisby Test Project"
	})
	.expectJSONTypes({
		"Content": String,
		"Id": Number
	})

	.afterJSON(function(data){
		var projectId = data.Id;

		frisby.create('And I create a item for a project')
		.post('https://todo.ly/api/items.json', {
			"Content": "My New Item",
			"ProjectId": projectId,
		})
		.expectStatus(200)
		.expectJSONTypes({
			"CreatedDate": String,
			"LastUpdatedDate": String
		})

		.afterJSON(function(data){
			expect(data.CreatedDate.substring(0,13)).toEqual(myDate.substring(0,13)); 
		})
		.afterJSON(function(data){
			expect(data.LastUpdatedDate.substring(0,13)).toEqual(myDate.substring(0,13)); 
		})

		.afterJSON(function(data){
			expect(data.CreatedDate).toEqual(data.LastUpdatedDate); 
		})

		.toss();


		frisby.create('Delete test')
		.delete('https://todo.ly/api/projects/'+projectId+'.json')
		.expectStatus(200)
		.toss();

	})
.toss();
