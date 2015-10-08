var Asana = require('asana');

var client = Asana.Client.create().useBasicAuth("API_KEY_HERE");
module.exports = {
  addTask: function(task, description) {
    client.users.me()
      .then(function(user) {
        var userId = user.id;
        var workspaceId = user.workspaces[1].id;
        console.log('workspace id:', workspaceId);
        return client.tasks.create({
          assignee: userId,
          name: task,
          workspace: "498346170860",
          projects: "56218871247864",
          notes: description
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