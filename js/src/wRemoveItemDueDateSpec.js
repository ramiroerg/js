/**
* Workflow 
* Create an item in the Inbox with a Due Date, Remove the Due Date
** Given I have a default projet Inbox with Id 0 and I create a Item with a Due Date
** When I remove the Due Date
** Then the item should display this parameter as empty
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
	"Content": "Test Item in the Inbox",
	"ProjectId":"0",
	"DueDate":"12/31/2014 00:00"
};

frisby.create('Given I have a default inbox project, create an item')
	.post('https://todo.ly/api/items.json',newItem)
	.expectStatus(200)
	.afterJSON(function(data){
		var itemId = data.Id;
		frisby.create('Then I should be able to remove the Due Date')
		.put('https://todo.ly/api/items/'+itemId+'.json',{
			"DueDate":"",
			"DueTimeSpecified":true
		})
		.expectStatus(200)
		.expectJSON({
			"DueDate":""
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