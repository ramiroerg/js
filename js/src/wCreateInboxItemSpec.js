/**
* Workflow 
* Create Item for the inbox and get the list of items using filters
** Given I have a default project 
** When I create an item
** Then the item should be created in the Inbox
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
	"Content": "Test Item in the Inbox"
};

var inboxId = 0;

frisby.create('Given I have a default inbox project, create an item')
	.post('https://todo.ly/api/items.json',newItem)
	.expectStatus(200)

	.afterJSON(function(data){
		var itemId = data.Id;
		frisby.create('Then I should be able to get this item using filters')
		.get('https://todo.ly/api/filters/'+inboxId+'/items.json')
		.expectStatus(200)
		.expectJSON('?',{
				"Content": "Test Item in the Inbox"
		})
		.afterJSON(function(data){
			frisby.create('Then I remove the created item in the inbox')
			.delete('https://todo.ly/api/items/'+itemId+'.json')
			.expectStatus(200)
			.toss();
		})	
		.toss();
	})	
.toss();