var frisby = require('/usr/local/lib/node_modules/frisby');

frisby.globalSetup({
	request: {
			headers: {
				Authorization: 'Basic cmFtaXJvZXJnQGljbG91ZC5jb206c2VjdXJlMTIz'
			},
			json: true
	}
})

frisby.create('Projects All Projects')
	.get('https://todo.ly/api/projects.json')
	.inspectJSON()
	
	.expectJSONLength(12)
	
	/*.expectJSON({
		data: function(val) {
			expect(val.length).toBeGreaterThan(0); 
		}

	})*/

	.afterJSON(function(data){
		expect(data.length).toBeGreaterThan(0); 
	})

	.after(function(err, res, body){
		expect(body.length).toBeGreaterThan(0); 

//		console.log(body);

	})


.toss();