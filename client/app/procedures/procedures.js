angular.module('producer.procedures', [])

.controller('proceduresController', function ($scope, Procedures) {
  $scope.procedures = [];
  $scope.detailsBox = false;
  $scope.submissionBox = true;

  $scope.procedure = {};
  $scope.newProcedure = {};

  $scope.toggleCreateProcedure = function(){
    $scope.detailsBox = false;
    $scope.submissionBox = true;
  }

  $scope.toggleProcedureDetails = function(procedure){
    $scope.procedure = procedure;
    $scope.detailsBox = true;
    $scope.submissionBox = false;
  }

  $scope.submitProcedure = function(){
    Procedures.submitProcedure($scope.newProcedure).then(submitSuccess, submitError)
  }

  var submitSuccess = function(response) {
    $scope.messages = 'Your procedure was created!';
    setTimeout(function(){
      $scope.messages = null;
      $scope.$apply();
    },3000);
    $scope.getProcedures();
  };

  var submitError = function(response) {
    $scope.messages = 'Sorry, there was an error submitting your form. Please submit again.';
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

  var deleteSuccess = function(response) {
    $scope.messages = 'Procedure Deleted';
    setTimeout(function(){
      $scope.messages = null;
      $scope.$apply();
    },3000);
    $scope.getProcedures();
  };

  var deleteError = function(response) {
    $scope.messages = 'Sorry, there was an error submitting your form. Please submit again.';
    console.log('error: ', response);
  };

  $scope.getProcedures();

});


