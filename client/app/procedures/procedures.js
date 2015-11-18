angular.module('producer.procedures', ['alertMessageDirective'])

.controller('proceduresController', function ($scope, Procedures, Messages) {
  $scope.procedures = [];
  $scope.showProcedure = false;

  $scope.procedure = {};
  $scope.newProcedure = {};

  $scope.submitProcedure = function(){
    Procedures.submitProcedure($scope.newProcedure).then(submitSuccess, submitError)
  }

  var submitSuccess = function(response) {
    Messages.setMessage('Your procedure was created!', 'success');
    $scope.getProcedures();
  };

  var submitError = function(response) {
    Messages.setMessage('Sorry, there was an error submitting your form. Please submit again.', 'error');
    console.log('error: ', response);
  };

  $scope.getProcedures = function(){
    Procedures.getProcedures().then(function(resp){
      $scope.procedures = resp.data;
    });
  }

  $scope.deleteProcedure = function(){
    Procedures.deleteProcedure($scope.procedure).then(deleteSuccess, deleteError)
  }

  $scope.setMaster = function(section) {
    $scope.selected = section;
    $scope.newProcedure.title = $scope.selected.title;
    $scope.newProcedure.text = $scope.selected.text;
    $scope.showProcedure = true;
    $scope.procedure = section;
  };

  $scope.createNewProcedure = function() {
    $scope.newProcedure.title = "";
    $scope.newProcedure.text = "";
    $scope.showProcedure = false;
  }

  var deleteSuccess = function(response) {
    Messages.setMessage('Procedure Deleted', 'success');
    $scope.getProcedures();
  };

  var deleteError = function(response) {
    Messages.setMessage('Sorry, there was an error submitting your form. Please submit again.', 'error');
    console.log('error: ', response);
  };

  $scope.getProcedures();

});


