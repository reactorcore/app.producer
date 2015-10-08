var Asana = require('asana');
// May need to require utils later. Haven't looked into it yet.

// TODO: using API key for basic auth. Will change later.
// TODO: add api key

// REFERENCE:
// dispatcher: basic wrapper for making HTTP requests to API + handles auth
// Does get/post requests + handles API url, etc.

var client = Asana.Client.create().useBasicAuth("eci1iJsm.WkjGC3onSSsYE30OaJ2zUme");
// it seems like we could just create a posting/create tasks function w/out the client.users.me()?
// .me returns current user of the dispatcher
// function needs to take params: assignee, name, workspace or project (according to docs)
module.exports = {
  addTask: function() {
    client.users.me()
      .then(function(user) {
        var userId = user.id;
        var workspaceId = user.workspaces[1].id;
        console.log('workspace id:', workspaceId);
        return client.tasks.create({
          assignee: userId,
          name: "Hello",
          workspace: "498346170860",
          projects: "56218871247864"
        });
      })
      .then(function(response) {
        console.log("response: ", response)
        return response;
      })
      .catch(function(error) {
        console.log("Error in adding task: ", error);
      });
    }
};

// Every task is required to be created in a specific workspace, and this workspace cannot be changed once set. The workspace need not be set explicitly if you specify a project or a parent task instead.

// interesting for use later
// SELECTING FIELDS
// "data": {                            this
//   "id": 1001,                        
//   "name": "Feed the cat",            this.name        
//   "workspace": {                     this.workspace
//     "id": 14916,
//     "name": "Shared Projects",
//   },
//   ....