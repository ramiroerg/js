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
	"Icon":4

};

frisby.create('Projects does not have sub projects (Childrens)')
	.get('https://todo.ly/api/projects/3343856.json')
	.expectJSONLength('Children',0)
	.expectJSON({
		Children: function(val) {
			expect(val.length).toBe(0); 
		}

	})
	.afterJSON(function(data){
		expect(data.Children.length).toBe(0); 
	})
	.after(function(err, res, body){
		expect(body.Children.length).toBe(0); 

//		console.log(body);

	})


.toss();