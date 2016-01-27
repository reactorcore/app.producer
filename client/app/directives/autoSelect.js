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
          'ui-select-required ' + 
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
        // max select allows a max number to be set on selected tags
        var enforceSelectMax = function() {
          if($scope.selectMax && $scope.temp.selected.length > +$scope.selectMax) {
            //emit synthetic click on X element to remove from line
            //ul where divs are located has class 'custom-ui-select-dropdown__top'
            elem[0].querySelector('.custom-ui-select-dropdown__top')
              .children[$scope.selectMax-1]
              .querySelector('.ui-select-match-close')
              .dispatchEvent(new Event('click'));
          }
        };
        // add listeners to add and remove focus styling for auto-select box
        var childTextArea = null;
        setTimeout(function() {
          childTextArea = elem[0].querySelector('input');

          childTextArea.onfocus = function() {
            // remove extra input area when not in focus
            angular.element(childTextArea).removeClass('remove-min-width');
            // add force focus to parent div to give illusion of single
            // component synchronicity between child input and parent div
            elem[0].querySelector('.ui-select-multiple')
              .classList.add('custom-ui-select-force-focus');
          };

          childTextArea.onblur = function() {
            // child temporarily loses focus, check if focus loss is real.
            // if so, we remove extra text input width. css :focus breaks.
            // doesnt wait to check if blur is real or not
            setTimeout(function(){
              if(document.activeElement !== childTextArea){
                childTextArea.classList.add('remove-min-width');
              }
            },6);

            angular.element(elem[0].querySelector('.ui-select-multiple'))
              .removeClass('custom-ui-select-force-focus');
          };
          // make sure selection # doesn't go over selectMax with return press
          childTextArea.onkeydown = function(e) {
            if(e.keyCode === 13){
              enforceSelectMax();
            }
          }
        });


        // focuses & activates childTextArea on parent click
        // use mouseup to avoid event forever-loop w/ click
        elem.on('mouseup', function(e) {
          childTextArea.focus();
          childTextArea.dispatchEvent(new Event('click'));
        });

        // make sure selection # doesn't go over selectMax with clicks
        elem.on('click', function(e) {
          enforceSelectMax();
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






