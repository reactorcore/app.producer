// Example of how to use this directive
// <prd-autocomplete itemName="role" target="template.role" formName="templateForm"></prd-autocomplete>

angular.module('producerAutoDirective', ['ngMaterial', 'ngAria', 'ngAnimate'])
  .directive('producerAuto', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        // Set arguments passed in as attributes to the local scope
        itemName: '=',
        targetName: '=',
        formName: '='
      },

      // Use link to set necessary variables and functions on the scope
      link: function(scope, element, attrs) {
        var item = attrs.itemName;
        var items = item + 's';
        var itemSearchText = item + 'SearchText';
        var filteredItems = 'filtered' + item + 's';
        var filterItemsBySearch = 'filter' + item + 'sBySearch';
        var searchItemTextChange = 'search' + item + 'TextChange';
        var selectedItemChange = 'selected' + item + 'Change';

        scope[itemSearchText] = '';
        scope[filteredItems] = [];
        scope[filterItemsBySearch] = function() {
          scope[itemSearchText] = scope[itemSearchText] || '';
          return scope[filteredItems] = scope[items].filter(function(item) {
            return item.toLowerCase().indexOf(scope[itemSearchText].toLowerCase()) >= 0;
          });
        };
        scope[searchItemTextChange] = function() {
          scope[attrs.target] = scope[itemSearchText];
        };
        scope[selectedItemChange] = function() {
          scope[attrs.formName].$invalid = (scope[items].indexOf(scope[attrs.target]) < 0);
        };
      },

      // template: function(element, attrs) {
      //   var item = attrs.itemName;
      //   var target = attrs.targetName;
      //   var htmlText = [
      //     '<md-autocomplete ',
      //       'required ',
      //       'md-items="' + item + ' in filter' + item + 'sBySearch()" ',
      //       'md-item-text="' + item + '" ',
      //       'md-selected-item="' + target + '" ',
      //       'md-selected-item-change="selected' + item + 'Change()" ',
      //       'md-search-text="' + item + 'searchText" ',
      //       'md-search-text-change="search' + item + 'TextChange()" ',
      //       'md-no-cache="true" ',
      //       'md-min-length="0" ',
      //       'md-delay="0" ',
      //       'placeholder="Search here for ' + item + 's" ',
      //     '> ',
      //       '<md-item-template> ',
      //         '<span md-highlight-text="' + item + 'searchText">{{' + item + '}}</span> ',
      //       '</md-item-template> ',
      //       '<md-not-found> ',
      //         item + ' not found. Please choose an existing ' + item + '. ',
      //       '</md-not-found> ',
      //     '</md-autocomplete>',
      //   ].join('');
      //   return htmlText;
      // },

      // Use compile to create template based on attributes
      compile: function(element, attrs) {
        var item = attrs.itemName;
        var target = attrs.targetName;
        var htmlText = [
          '<md-autocomplete ',
            'required ',
            'md-items="' + item + ' in filter' + item + 'sBySearch()" ',
            'md-item-text="' + item + '" ',
            'md-selected-item="' + target + '" ',
            'md-selected-item-change="selected' + item + 'Change()" ',
            'md-search-text="' + item + 'searchText" ',
            'md-search-text-change="search' + item + 'TextChange()" ',
            'md-no-cache="true" ',
            'md-min-length="0" ',
            'md-delay="0" ',
            'placeholder="Search here for ' + item + 's" ',
          '> ',
            '<md-item-template> ',
              '<span md-highlight-text="' + item + 'searchText">{{' + item + '}}</span> ',
            '</md-item-template> ',
            '<md-not-found> ',
              item + ' not found. Please choose an existing ' + item + '. ',
            '</md-not-found> ',
          '</md-autocomplete>',
        ].join('');
        element.replaceWith(htmlText);
      }
    }
  });

