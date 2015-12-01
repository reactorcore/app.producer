// Example of how to use this directive
// <prd-autocomplete itemName="role" collection="roles" target="template.role" form="templateForm"></prd-autocomplete>

angular.module('producerAutoDirective', ['ngMaterial', 'ngAria', 'ngAnimate'])
  .directive('producerAuto', function() {
    return {

      restrict: 'E',
      scope: {
        // Set arguments passed in as attributes to the local scope
        itemName: '@',
        target: '=',
        collection: '=',
        form: '=',
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
          ['<md-autocomplete ',
            'required ',
            'md-items="item in filterBySearch()" ',
            'md-item-text="item" ',
            'md-selected-item="target"',
            'md-selected-item-change="updateTarget()" ',
            'md-search-text="searchText" ',
            'md-search-text-change="searchTextChange" ', //???
            'md-no-cache="true" ',
            'md-min-length="0" ',
            'md-delay="0" ',
            'placeholder="Search here for {{ itemName }}s" ',
          '> ',
            '<md-item-template> ',
              '<span md-highlight-text="searchText">{{ item }}</span> ',
            '</md-item-template> ',
            '<md-not-found> ',
              '{{ itemName }} not found. Please choose an existing {{ itemName }}. ',
            '</md-not-found> ',
          '</md-autocomplete>'
        ].join('')

    }
  });

