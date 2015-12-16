angular.module('autoSelect', ['ui.select', 'ngSanitize'])
  .service('Utils', function(){
    this.removeX = function(nodes) {
      nodes = nodes || document.querySelectorAll('.close')
      for(var i = 0; i < nodes.length; i++){
        nodes[i].remove();
      }
    };
    this.addTagClickHandler = function(handler, nodes) {
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
          // '<div class="ui-select-choices-row"></div>' +
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

      link: function($scope, elem, attrs){

         $scope.update = function() {
          // remove Xs from buttons
          Utils.removeX();
          // removes click target tag from selected tags
          Utils.addTagClickHandler(function(e) {
            $scope.temp.selected = $scope.temp.selected.filter(function(tag) {
              return tag[$scope.filterKey] !== e.target.innerText;
            });
            $scope.$apply();
          });
          // replaces last selected element if limit exceeds selectMax
          if($scope.selectMax && $scope.temp.selected.length > +$scope.selectMax){
            $scope.temp.selected.splice(+$scope.selectMax-1, 1);
          }
          // set outward facing output array = to inner opperated array
          $scope.selected = $scope.temp.selected;
        };
 
        // no errors thrown if numbers filtered
        $scope.choices = $scope.choices.map(function(i) {
          return typeof i !== 'string' && typeof i !== 'object' ? i.toString() : i;
        });

        // workaround for AWFUL bug
        setTimeout(function(){
          var container = elem.querySelectorAll('.ui-select-choices');
          for(var i = 0; i < 2; i++){
            var div = document.createElement('div');
            div.className = 'ui-select-choices-row';
            container[0].children[0].appendChild(div);
          }
        });
        
        // focuses & activates child on parent click
        elem.on('mouseup', function(e) {
          var child = this.children[0].children[0].children[1];
          child.focus();
          angular.element(child).trigger('click');
        });

      }
    }
  }]);

// track by throws error unless mod to ui-select
// replace ~line 1281 in select.js with
// if(matches && matches.length>0 && result[matches[1]] == value[matches[1]]){
// Now track by line ~38 can be uncommented above






