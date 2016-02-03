angular.module('uiSelectRequired', [])
  .directive('uiSelectRequired', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.uiSelectRequired = function(modelValue, viewValue) {
        if (angular.isArray(modelValue)) {
          return modelValue.length > 0;
        } else {
          return false;
        }
      };
    }
  };
});