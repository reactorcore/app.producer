// This directive takes three attributes:
// itemName: a string describing the thing being selected
// collection: the collection to display as options to select (must be a property on parent $scope)
// target: the property on the parent $scope to bind the selected item to

// Example use:
// <prd-autocomplete itemName="role" collection="roles" target="template.role"></prd-autocomplete>

angular.module('producerAutocompleteDirective', ['ngMaterial', 'ngAria', 'ngAnimate'])
  .directive('producerAutocomplete', function() {
    return {

      restrict: 'E',

      scope: {
        itemName: '@',
        target: '=',
        collection: '=',
      },

      controller: function($scope) {
        $scope.searchText = '';

        $scope.filterBySearch = function() {
          $scope.target = $scope.target || '';
          return $scope.collection.filter(function(item) {
            return item.toLowerCase().indexOf($scope.target.toLowerCase()) >= 0;
          });
        };

        $scope.updateTarget = function() {
          $scope.target = $scope.searchText;
        };

        $scope.searchTextChange = function() {
          $scope.target = $scope.searchTextChange;
          console.log($scope.target);
        };
        
      },

      template:
        '<md-autocomplete ' +
          'required ' +
          'md-items="item in filterBySearch()" ' +
          'md-item-text="item" ' +
          'md-selected-item="target"' +
          'md-selected-item-change="updateTarget()" ' +
          'md-search-text="searchText" ' +
          'md-search-text-change="searchTextChange" ' +
          'md-no-cache="true" ' +
          'md-min-length="0" ' +
          'md-delay="0" ' +
          'placeholder="Search here for {{ itemName }}s" ' +
        '> ' +
          '<md-item-template> ' +
            '<span md-highlight-text="searchText">{{ item }}</span> ' +
          '</md-item-template> ' +
          '<md-not-found> ' +
            '{{ itemName }} not found. Please choose an existing {{ itemName }}. ' +
          '</md-not-found> ' +
        '</md-autocomplete>'

    }
  });

