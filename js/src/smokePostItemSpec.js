/**
* Smoke Test 
* Create a new Item
** Given I have at least one Default project created in my account
** When I create a new Item
** Then I should get a code 200 
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
	"Content": "My New Item"

};

frisby.create('Create a new Item')
	.post('https://todo.ly/api/items.json',newItem)
	.expectStatus(200)
	.expectJSONTypes({
			"Content": String
	})

	.afterJSON(function(data){
			var Id = data.Id;
			frisby.create('Delete test item')
			.delete('https://todo.ly/api/items/'+Id+'.json')
			.expectStatus(200)
	.toss();
	})
.toss();