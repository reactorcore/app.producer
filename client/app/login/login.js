angular.module('producer.login', [])

.controller('loginController', function ($scope, Commit) {

  Commit.getHash().then(function(response){
    $scope.commitHash = response.data.substring(0, 7);
  });

});
