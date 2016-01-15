angular.module('producer.procedures', [])

.controller('proceduresController', function ($scope, Procedures, Messages, Hilighter) {
  //TODO: hacky way to not carry over message
  Messages.clearMessage();
  $scope.procedures = [];
  $scope.showProcedure = false;

  $scope.procedure = {};
  $scope.confirm = undefined;

  $scope.getClass = function (procedure) {
    if(procedure === {} || $scope.selected === undefined) {
      return '';
    }
    return Hilighter.hilight(procedure.title, $scope.selected.title);
  };

  $scope.getProcedures = function(){
    Procedures.getProcedures().then(function(response){
      $scope.procedures = response.data.map(function(procedure) {
        procedure.originalTitle = procedure.title;
        return procedure;
      });

      // if existing procedure is currently selected
      if ($scope.procedure.id) {
        $scope.procedures.forEach(function(procedure) {
          if (procedure.id === $scope.procedure.id) {
            $scope.procedure = procedure;
          }
        });
      }
    });
  };

  $scope.setMaster = function(section) {
    $scope.selected = $scope.procedure = section;
    $scope.showProcedure = true;
    $scope.confirm = undefined;
    Messages.clearMessage();
  };

  $scope.createNewProcedure = function(){
    $scope.procedure = {};
    $scope.showProcedure = false;
    $scope.selected = undefined;
  };

  $scope.submitProcedure = function(){
    Procedures.submitProcedure($scope.procedure).then(submitSuccess, submitError);
  };

  var submitSuccess = function(response) {
    Messages.setMessage('Your procedure was created!', 'success');
    $scope.procedure.title = "";
    $scope.procedure.text = "";
    $scope.showProcedure = false;
    $scope.getProcedures();
  };

  var submitError = function(response) {
    Messages.setMessage('Sorry, there was an error submitting your form. Please submit again.', 'error');
    console.log('error: ', response);
  };

  $scope.updateProcedure = function() {
    Procedures.updateProcedure($scope.procedure).then(updateSuccess, updateError);
  };

  var updateSuccess = function(response) {
    Messages.setMessage('Your procedure was updated!', 'success');
    $scope.getProcedures();
  };

  var updateError = function(response) {
    Messages.setMessage('Sorry, there was an error updating your Procedure. Please try again.', 'error');
    console.log('error: ', response);
    $scope.getProcedures();
  };

  $scope.deleteProcedure = function(){
    if ($scope.confirm) {
      Procedures.deleteProcedure($scope.procedure).then(deleteSuccess, deleteError);
      $scope.confirm = undefined;
    } else {
      $scope.confirm = 'content__delete--confirm';
    }
  };

  var deleteSuccess = function(response) {
    Messages.setMessage('Procedure Deleted', 'success');
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


