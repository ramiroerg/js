var frisby = require('/usr/local/lib/node_modules/frisby');

var request = {
			headers: {
				Authorization: 'Basic cmFtaXJvZXJnQGljbG91ZC5jb206c2VjdXJlMTIz'
			},
			json: true
};

frisby.create('Get Default Projects created')
	.post('https://todo.ly/api/projects.json')

	.inspectJSON()
	.expectStatus(200)
	.afterJSON(function(data){
		expect(data.length).toBeGreaterThan(0); 
	})


.toss();