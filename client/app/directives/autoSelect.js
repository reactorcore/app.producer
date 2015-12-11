angular.module('autoSelect', ['ui.select', 'ngSanitize'])
  .service('Utils', function(){
    this.removeX = function(nodes){
      nodes = nodes || document.querySelectorAll('.close')
      for(var i = 0; i < nodes.length; i++){
        nodes[i].remove();
      }
    };
    this.addClickHandler = function(handler,nodes){
      nodes = nodes || document.querySelectorAll('.btn');
      for(var i = 0; i < nodes.length; i++){
        if(!nodes[i].handled){
          nodes[i].addEventListener('click', handler);
          nodes[i].handled = true;
        } 
      }
    };
  })
  .directive('autoSelect', ['Utils', function(Utils){

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

      controller:function($scope){
        $scope.temp = {selected:[]};
        $scope.update = function(){

          Utils.removeX();

          Utils.addClickHandler(function(e){
            $scope.temp.selected = $scope.temp.selected.filter(function(tag){
              return tag[$scope.filterKey] !== e.target.innerText;
            });
            $scope.$apply();
          });

          if($scope.selectMax && $scope.temp.selected.length > +$scope.selectMax){
            $scope.temp.selected.splice(+$scope.selectMax-1, 1);
          }

          $scope.selected = $scope.temp.selected;
        };
      },

      template: 
        '<ui-select ' +
          'on-select="update()" '+
          'on-remove="update()" '+
          'ng-click="focusChild(this)"'+
          'id="template__tags" '+
          'class="content__input--field" '+
          'multiple '+
          'ng-model="temp.selected" '+
          'ng-disabled="disabled">'+

          '<ui-select-match '+
            'class="dropdown__top" '+
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

      link: function($scope, elem){
        // no errors thrown if numbers filtered
        $scope.choices = $scope.choices.map(function(i) {
          return typeof i !== 'string' && typeof i !== 'object' ? i.toString() : i;
        });

        elem.on('click', function(){
          this.children[0].children[0].children[1].focus();
        });


        //events include focusin click keyup(for return key)
        //example for potential further styling
        // elem.on('click keyup', function(e){
        //   if(e.type==='click'||e.type==='keyup'&&e.keyCode===13){
        //     angular.element(document.querySelectorAll('.ui-select-match-item')).addClass('ui-select-button');
        //   }
        // });
      }
    }
  }]);

// track by throws error unless mod to ui-select
// replace ~line 1281 in select.js with
// if(matches && matches.length>0 && result[matches[1]] == value[matches[1]]){
// Now track by line ~38 can be uncommented above






