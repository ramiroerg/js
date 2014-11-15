/**
* Smoke Test
* Default Items created
** Given a new build deployed
** When I look for items
** Then I should have at lest one
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

frisby.create('Get Default created Items')
	.get('https://todo.ly/api/items.json')
	.expectStatus(200)
	.afterJSON(function(data){
		expect(data.length).toBeGreaterThan(0); 
	})
.toss();