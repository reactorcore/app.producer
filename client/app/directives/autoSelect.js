angular.module('autoSelect', ['ui.select', 'ngSanitize'])
  .directive('autoSelect', [function(){

    return {

      restrict: 'E',

      scope: {
        choices: '=',
        selected: '=',
        filterKey: '@',
        placeholder: '@',
        trackKey: '@',
        selectMax: '@'
      },

      controller:function($scope) {
        $scope.temp = {selected:[]};
      },

      template: 
        '<ui-select ' +
          'on-select="update()" '+
          'on-remove="update()" '+
          'id="template__tags" '+
          'ng-click="focusChild(this)"'+
          'class="content__input--field" '+
          'multiple '+
          'ng-model="temp.selected" '+
          'ng-disabled="disabled">'+
          '<ui-select-match '+
            'class="custom-ui-select-dropdown__top" '+
            'placeholder="{{placeholder}}">'+
              '{{$item[filterKey] || $item}}'+
          '</ui-select-match>'+
          
          '<ui-select-choices '+
            'position="down" '+
            'repeat="choice in (choices | filter: $select.search) '+
            // 'track by choice[trackKey] || $index'+
            '">'+

            '<div ng-bind-html="choice[filterKey] || choice | highlight: $select.search"></div>'+
          '</ui-select-choices>'+
        '</ui-select>',

      link: function($scope, elem, attrs){
        // add listeners to add and remove focus styling for select box
        var child = null;
        setTimeout(function() {
          child = elem[0].children[0].children[0].children[1];
          child.onfocus = function(){
            elem[0].children[0].classList.add('custom-ui-select-force-focus');
          };
          child.onblur = function() {
            angular.element(elem[0].children[0]).removeClass('custom-ui-select-force-focus');
          };
        });

        // focuses & activates child on parent click
        elem.on('mouseup', function(e) {
          child.focus();
          child.dispatchEvent(new Event('click'));
        });

        $scope.update = function() {
          // replaces last selected element if limit exceeds selectMax
          if($scope.selectMax && $scope.temp.selected.length > +$scope.selectMax){
            //emit syntehsized click on X element to remove from line
            //ul where divs are located has class 'custom-ui-select-dropdown__top'
            elem[0].children[0].children[0].children[0].children[$scope.selectMax-1]
              .children[0].children[0].dispatchEvent(new Event('click'));
          }
          // set outward facing output array = to inner opperated array
          $scope.selected = $scope.temp.selected;
        };
 
        // no errors thrown if numbers filtered
        $scope.choices = $scope.choices.map(function(i) {
          return typeof i !== 'string' && typeof i !== 'object' ? i.toString() : i;
        });

        // workaround for very bug. 
        // Bug occurs when we force child focus from parent
        // has to do with a validation function in ui-select
        setTimeout(function() {
          var container = elem.querySelectorAll('.ui-select-choices');
          for(var i = 0; i < 2; i++){
            var div = document.createElement('div');
            div.className = 'ui-select-choices-row';
            container[0].children[0].appendChild(div);
          }
        });

      }
    }
  }]);

// track by throws error unless mod to ui-select
// replace ~line 1281 in select.js with
// if(matches && matches.length>0 && result[matches[1]] == value[matches[1]]){
// Now track by line ~38 can be uncommented above






