angular.module('autoSelectDirective', ['ui.select', 'ngSanitize'])
  .directive('autoUiSelect', function(){
    return {

      restrict: 'E',

      scope: {
        input: '=',
        output: '=',
        filterKey: '@',
        placeholder: '@',
        trackKey: '@'
      },

      controller:function($scope){
        $scope.temp = {selected:[]};
        $scope.update = function(){
          $scope.output = $scope.temp.selected;
        };
      },

      template: 
        '<ui-select ' +
          'on-select="update()" '+
          'on-remove="update()" '+
          'id="template__tags" '+
          'class="content__input--field" '+
          'multiple '+
          'ng-model="temp.selected" '+
          'ng-disabled="disabled">'+

          '<ui-select-match on-change="change()" placeholder="{{placeholder}}">{{$item[filterKey] || $item}}</ui-select-match>'+
          
          '<ui-select-choices '+
            'class="red" '+
            'position="down" '+
            'repeat="item in (input | filter: $select.search) '+
            'track by item[trackKey] || $index">'+

            '<div ng-bind-html="item[filterKey] || item | highlight: $select.search"></div>'+
          '</ui-select-choices>'+
        '</ui-select>',

      link: function($scope, elem){
        //events include focusin click keyup(for return key)
        //example for potential further styling
        // elem.on('click keyup', function(e){
        //   if(e.type==='click'||e.type==='keyup'&&e.keyCode===13){
        //     angular.element(document.querySelectorAll('.ui-select-match-item')).addClass('ui-select-button');
        //   }
        // });
      }
    }
  });








