angular.module('autoSelect', ['ui.select', 'ngSanitize'])
  .directive('autoSelect', [function() {
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

      link: function($scope, elem, attrs) {
        // add listeners to add and remove focus styling for auto-select box
        var childTextArea = null;
        setTimeout(function() {
          childTextArea = elem[0].querySelector('input');

          childTextArea.onfocus = function() {
            elem[0].querySelector('.ui-select-multiple')
              .classList.add('custom-ui-select-force-focus');
          };

          childTextArea.onblur = function() {
            angular.element(elem[0].querySelector('.ui-select-multiple'))
              .removeClass('custom-ui-select-force-focus');
          };
        });

        // focuses & activates childTextArea on parent click
        elem.on('mouseup', function(e) {
          childTextArea.focus();
          childTextArea.dispatchEvent(new Event('click'));
        });

        // make sure selection # doesn't go over selectMax
        elem.on('click', function(){
          if($scope.selectMax && $scope.temp.selected.length > +$scope.selectMax) {
            //emit syntehsized click on X element to remove from line
            //ul where divs are located has class 'custom-ui-select-dropdown__top'
            elem[0].querySelector('.custom-ui-select-dropdown__top')
              .children[$scope.selectMax-1]
              .querySelector('.ui-select-match-close')
              .dispatchEvent(new Event('click'));
          }
        });
        //ran each time a tag is added or removed
        $scope.update = function() {
          // set client facing output array to match ui-select array
          $scope.selected = $scope.temp.selected;
        };
 
        // no errors thrown if numbers filtered
        $scope.choices = $scope.choices.map(function(i) {
          return typeof i === 'string' || typeof i === 'object' ? i : i.toString();
        });

        // workaround for mean bug. 
        // Bug occurs when we force child focus from parent
        // has to do with a validation function in ui-select
        setTimeout(function() {
          var validationLi = elem[0].querySelector('.ui-select-choices-group');
          for(var i = 0; i < 2; i++){
            var div = document.createElement('div');
            div.className = 'ui-select-choices-row';
            validationLi.appendChild(div);
          }
        });
      }
    }
  }]);

// track by throws error unless modified in select.js
// replace line in function "checkFnMultiple" (add a check for if matches exists)
// if(matches && matches.length>0 && result[matches[1]] == value[matches[1]]){
// Now trackby can be used in ui-choices repete attribute






