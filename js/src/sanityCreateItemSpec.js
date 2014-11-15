/**
* Sanity Test
* Create Item
** Given I have at least one Default project created in my account
** When I create a new Item "Test Item"
** Then I should get an String with the same name
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

var newItem = {
	"Content": "Test Item"
};

frisby.create('Create a new Item')
	.post('https://todo.ly/api/items.json',newItem)
	.expectStatus(200)
	.expectJSON({
			"Content": "Test Item"
	})
	.expectJSONTypes({
			"Content": String
	})

	.afterJSON(function(data){
			var Id = data.Id;
			frisby.create('Delete test Item')
			.delete('https://todo.ly/api/items/'+Id+'.json')
			.expectStatus(200)
			.toss();
	})
.toss();