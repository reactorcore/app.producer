angular.module('producer.procedures', ['alertMessage'])

.controller('proceduresController', function ($scope, Procedures, Messages, Hilighter) {
  //TODO: hacky way to not carry over message
  Messages.clearMessage();
  $scope.procedures = [];
  $scope.showProcedure = false;

  $scope.procedure = {};
  $scope.newProcedure = {};

  $scope.getClass = function (procedure) {
    if(procedure === undefined || $scope.selected === undefined) {
      return '';
    }
    return Hilighter.hilight(procedure.title, $scope.selected.title);
  };

  $scope.createNewProcedure = function(){
    $scope.newProcedure = {};
    $scope.procedure = {};
    $scope.showProcedure = false;
    $scope.selected = undefined;
  };

  $scope.submitProcedure = function(){
    Procedures.submitProcedure($scope.newProcedure).then(submitSuccess, submitError);
  };

  var submitSuccess = function(response) {
    Messages.setMessage('Your procedure was created!', 'success');
    $scope.newProcedure.title = "";
    $scope.newProcedure.text = "";
    $scope.showProcedure = false;
    $scope.getProcedures();
  };

  var submitError = function(response) {
    Messages.setMessage('Sorry, there was an error submitting your form. Please submit again.', 'error');
    console.log('error: ', response);
  };

  $scope.getProcedures = function(){
    Procedures.getProcedures().then(function(response){
      $scope.procedures = response.data;
    });
  };

  $scope.deleteProcedure = function(){
    Procedures.deleteProcedure($scope.procedure).then(deleteSuccess, deleteError);
  };

  $scope.setMaster = function(section) {
    $scope.selected = section;
    $scope.newProcedure.title = $scope.selected.title;
    $scope.newProcedure.text = $scope.selected.text;
    $scope.showProcedure = true;
    $scope.procedure = section;
  };

  var deleteSuccess = function(response) {
    Messages.setMessage('Procedure Deleted', 'success');
    $scope.newProcedure = {};
    $scope.procedure = {};
    $scope.showProcedure = false;
    $scope.getProcedures();
  };

  var deleteError = function(response) {
    Messages.setMessage('Sorry, there was an error submitting your form. Please submit again.', 'error');
    console.log('error: ', response);
    $scope.getProcedures();
  };

  $scope.getProcedures();

});


