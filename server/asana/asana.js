var Asana = require('asana');
console.log("API KEY: ", process.env.ASANA_API_KEY)
var client = Asana.Client.create().useBasicAuth(process.env.ASANA_API_KEY);
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
          workspace: process.env.WORKSPACE_ID,
          projects: process.env.PROJECT_ID,
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