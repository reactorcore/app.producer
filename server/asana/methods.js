module.exports = function asana(client) {
  return {
    addTask: function(title, roleID, event, procedure) {
      console.log(client);
      client.users.me()
        .then(function(user) {
          var userId = user.id;
          return client.tasks.create({
            assignee: userId,
            name: title,
            workspace: process.env.WORKSPACE_ID,
            projects: process.env.PROJECT_ID,
            notes: "Who: " +  'https://app.asana.com/0/0/' + roleID + "\nWhen: " + event + "\n\nProcedure: " + procedure + "\nTemplate: link-to-template"
          });
        })
        .then(function(response) {
          console.log("response: ", response)
          return response;
        })
        .catch(function(error) {
          console.log("Error in adding task: ", error);
        });
      },

    getRoles: function(callback){
      var USER;
      client.users.me()
        .then(function(user) {
          USER = user;
          var userId = user.id;
          var workspaceId = user.workspaces[1].id;
          // return client.tasks.findByProject(process.env.ROLES_ID, {
          //   workspace: workspaceId
          // });
          // TEMP SOLUTION TO TEST GETTING ROLES FROM ASANA 
          return client.tasks.findByProject(52273497420187, {
            workspace: process.env.WORKSPACE_ID
          });
        })
        .then(function(response){
          callback(response);
        })
        .catch(function(error){
          console.log("Error in getting roles: ", error);
          callback([error, USER, process.env.WORKSPACE_ID]);
        });
      }
  };
    
};
