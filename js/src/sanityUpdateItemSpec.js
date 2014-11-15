/**
* Sanity Test
* Update Item
** Given I have a Project with an Item
** When I update the name of the item
** Then the name should be updated
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
			frisby.create('Update test item')
			.put('https://todo.ly/api/items/'+Id+'.json',{
				"Content": "Updated Test Item"
			})
			.expectStatus(200)
			.expectJSON({
				"Content": "Updated Test Item"
			})
			.afterJSON(function(data){
				frisby.create('Delete test Item')
				.delete('https://todo.ly/api/items/'+Id+'.json')
				.expectStatus(200)
				.toss();
			})
			.toss();
	})	
.toss();