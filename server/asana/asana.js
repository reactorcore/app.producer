//                   DEPRECATED
// ----------------------------------------------
// var Asana = require('asana');

// var client = Asana.Client.create().useBasicAuth(process.env.ASANA_API_KEY);

// module.exports = {
//   addTask: function(role, event, description) {
//     client.users.me()
//       .then(function(user) {
//         var userId = user.id;
//         return client.tasks.create({
//           assignee: userId,
//           name: role,
//           workspace: process.env.WORKSPACE_ID,
//           projects: process.env.PROJECT_ID,
//           notes: "Who: " + role + "\nWhen: " + event + "\n\nDescription: " + description + "\nTemplate: link-to-template"
//         });
//       })
//       .then(function(response) {
//         console.log("response: ", response)
//         return response;
//       })
//       .catch(function(error) {
//         console.log("Error in adding task: ", error);
//       });
//     },
//   getRoles: function(callback){
//     client.users.me()
//       .then(function(user) {
//         var userId = user.id;
//         var workspaceId = user.workspaces[1].id;
//         return client.tasks.findByProject(process.env.ROLES_ID, {
//           workspace: workspaceId
//         });
//       })
//       .then(function(response){
//         callback(response);
//       })
//       .catch(function(error){
//         console.log("Error in getting roles: ", error);
//       });
//     }
    
// };
