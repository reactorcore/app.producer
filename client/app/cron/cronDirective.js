angular.module('templates-angularcron', ['cron-select.html']);

angular.module("cron-select.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cron-select.html",
    "  <div>\n" +
    "    <div class=\"cron-row\">\n" +
    "      <div class=\"cron-col\">\n" +
    "        <span class=\"cron-title\">Repeat By: </span>\n" +
    "      </div>\n" +
    "      <div class=\"cron-col\">\n" +
    "        <select ng-model=\"myFrequency.base\" ng-options=\"item.value as item.label for item in frequency\"></select>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"cron-row\" ng-show=\"myFrequency.base == 5\">\n" +
    "      <div class=\"cron-col\">\n" +
    "        <span ng-show=\"myFrequency.base == 5\">Month: </span>\n" +
    "      </div>\n" +
    "      <div class=\"cron-col\">\n" +
    "        <select ng-show=\"myFrequency.base == 5\" ng-model=\"myFrequency.monthValue\" ng-options=\"(value | monthName) for value in monthValue\"></select>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"cron-row\" ng-show=\"myFrequency.base == 5 || myFrequency.base == 4\">\n" +
    "      <div class=\"cron-col\">\n" +
    "        <span ng-show=\"myFrequency.base == 5 || myFrequency.base == 4\">Date: </span>\n" +
    "      </div>\n" +
    "      <div class=\"cron-col\">\n" +
    "        <select ng-show=\"myFrequency.base == 5 || myFrequency.base == 4\" ng-model=\"myFrequency.dayOfMonthValue\" ng-options=\"(value | numeral) for value in dayOfMonthValue\"></select>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"cron-row\" ng-show=\"myFrequency.base == 6\">\n" +
    "      <div class=\"cron-col\">\n"+
    "        <span ng-show=\"myFrequency.base == 6\">Day: </span>\n" +
    "      </div>\n" +
    "      <div class=\"cron-col\">\n" +
    "        <select ng-show=\"myFrequency.base == 6\" ng-model=\"myFrequency.dayOfWeekValue\" ng-options=\"(value | dayName) for value in dayOfWeekValue\"></select>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"cron-row\" ng-show=\"myFrequency.base >= 3\">\n" +
    "      <div class=\"cron-col\">\n" +
    "        <span ng-show=\"myFrequency.base >= 3\">Hour: </span>\n" +
    "      </div>\n" +
    "      <div class=\"cron-col\">\n" +
    "        <select ng-show=\"myFrequency.base >= 3\" ng-model=\"myFrequency.hourValue\" ng-options=\"value for value in hourValue\"></select>\n" +
    "      </div>\n" +
    "    </div>\n"+
    "    <div class=\"cron-row\" ng-show=\"myFrequency.base >= 2\">\n"+
    "      <div class=\"cron-col\">\n"+
    "        <span ng-show=\"myFrequency.base >= 2\">Minutes: </span>\n"+
    "      </div>\n"+
    "      <div class=\"cron-col\">\n"+
    "        <select ng-show=\"myFrequency.base >= 2\" class=\"cron-select minute-value\" ng-model=\"myFrequency.minuteValue\" ng-options=\"value for value in minuteValue\"></select>\n"+
    "      </div>\n"+
    "    </div>\n"+
    "  </div>\n"+
    "");
}]);

'use strict';

angular.module('angular-cron', ['templates-angularcron']);

'use strict';

angular.module('angular-cron', ['templates-angularcron']);

'use strict';


angular.module('angular-cron').directive('cronSelect', ['cronService', function(cronService) {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {
        config : '=',
        output : '=?',
        init   : '=?'
    },
    templateUrl: function(element, attributes) {
      return attributes.template || 'cron-select.html';
    },
    link: function($scope) {

    var originalInit = undefined;
    var initChanged = false;

    $scope.frequency = [
      {
        value : 2,
        label : 'Minute'  
      },
      {
        value : 3,
        label : 'Hour'
      },
      {
        value : 4,
        label : 'Day of Month'  
      },
      {
        value : 5,
        label : 'Month'  
      },
      {
        value : 6,
        label : 'Day of Week'  
      }
    ];
          



    if (angular.isDefined($scope.init)) {
      console.log('init value found: ', $scope.init);
      originalInit = angular.copy($scope.init);
      $scope.myFrequency = cronService.fromCron($scope.init);
    }

    $scope.$watch('init', function(newValue){
      //console.log('watch on init fired!', newValue, originalInit);
      if(angular.isDefined(newValue) && newValue && (newValue !== originalInit)){
        initChanged = true;
        $scope.myFrequency = cronService.fromCron(newValue);
      }
    });

    if(typeof $scope.config === 'object' && !$scope.config.length){
      var optionsKeyArray = Object.keys($scope.config.options);
      for (var i in optionsKeyArray) {
        var currentKey = optionsKeyArray[i].replace(/^allow/, '');
        var originalKey = optionsKeyArray[i];
        if(!$scope.config.options[originalKey]){
          for(var b in $scope.frequency){
            if($scope.frequency[b].label === currentKey){
              $scope.frequency.splice(b, 1);
            }
          }
        }
      }
    }

    $scope.minuteValue = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    $scope.hourValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    $scope.dayOfWeekValue = [0, 1, 2, 3, 4, 5, 6];
    $scope.dayOfMonthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    $scope.monthValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    $scope.$watch('myFrequency', function(newValue, oldValue) {
      console.log('myFrequency has changed. newValue: ', newValue, ' oldValue ', oldValue);
      if (newValue && (!oldValue || newValue.base !== oldValue.base) && !initChanged) {
        if (newValue && newValue.base) {
          newValue.base = parseInt(newValue.base);
          newValue.secondValue = 0;
        }
        if(newValue && newValue.base && newValue.base >= 2) {
          newValue.minuteValue = $scope.minuteValue[0];
        }
        if(newValue && newValue.base && newValue.base >= 3) {
          newValue.hourValue = $scope.hourValue[0];
        }

        if(newValue && newValue.base && (newValue.base === 4 || newValue.base === 5)) {
          newValue.dayOfMonthValue = $scope.dayOfMonthValue[0];
        }

        if(newValue && newValue.base && newValue.base === 5) {
          newValue.monthValue = $scope.monthValue[0];
        }
        if(newValue && newValue.base && newValue.base === 6) {
          newValue.dayOfWeekValue = $scope.dayOfWeekValue[0];
        } else if(newValue && newValue.base && oldValue && oldValue.base){
            initChanged = false;
        }
      }
      $scope.output = cronService.setCron(newValue);
    }, true);
  }
  };
}]).filter('numeral', function() {
  return function(input) {
    switch (input) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      case 21:
        return '21st';
      case 22:
        return '22nd';
      case 23:
        return '23rd';
      case 31:
        return '31st';
      case null:
        return null;
      default:
        return input + 'th';
    }
  };
}).filter('monthName', function() {
  return function(input) {
    var months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    };

    if (input !== null) {
      return months[input];
    } else {
      return null;
    }
  };
}).filter('dayName', function() {
    return function(input) {
      var days = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
      };

      if (input !== null) {
        return days[input];
      } else {
        return null;
      }
  };
});

'use strict';

angular.module('angular-cron').factory('cronService', function() {
  var service = {};

  service.setCron = function(n) {
    console.log('set cron called: ', n);
    var cron = ['*', '*', '*',  '*',  '*', '*'];
    // console.log('cron: ', cron);

    if(n && n.base && n.base >= 1) {
        cron[0] = typeof n.secondValue !== undefined ? n.secondValue : '*';
    }

    if(n && n.base && n.base >= 2) {
        cron[1] = typeof n.minuteValue !== undefined ? n.minuteValue  : '*';
    }

    if(n && n.base && n.base >= 3) {
        cron[2] = typeof n.hourValue !== undefined ? n.hourValue  : '*';
    }


    if(n && n.base && (n.base === 4 || n.base === 5)) {
        cron[3] = typeof n.dayOfMonthValue !== undefined ? n.dayOfMonthValue : '*';
    }

    if(n && n.base && n.base === 5) {
        cron[4] = typeof n.monthValue !== undefined ? n.monthValue : '*';
    }

    if(n && n.base && n.base === 6) {
        cron[5] = typeof n.dayOfWeekValue !== undefined ? n.dayOfWeekValue : '*';
    }

    console.log('cron after setCron ', cron.join(' '));
    return cron.join(' ');
  };

  service.fromCron = function(value) { 
    console.log('set cron fired!');
    var cron = value.replace(/\s+/g, ' ').split(' ');
    var frequency = {base: '1'}; // default: every second

    if(cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*'  && cron[4] === '*' && cron[5] === '*') {
      frequency.base = 1; // every second
    } else if(cron[1] === '*' && cron[2] === '*' && cron[3] === '*'  && cron[4] === '*' && cron[5] === '*') {
      frequency.base = 2; // every minute
    } else if(cron[2] === '*' && cron[3] === '*'  && cron[4] === '*' && cron[5] === '*') {
      frequency.base = 3; // every hour
    } else if(cron[3] === '*' && cron[4] === '*' && cron[5] === '*') {
      frequency.base = 4; // every day
    } else if(cron[3] === '*' && cron[4] === '*') {
      frequency.base = 5; // every week
    } else if(cron[5] === '*') {
      frequency.base = 6; // every month
    }

    // console.log('frequency should be 5: ', frequency, cron);

    if (cron[0] !== '*') {
      frequency.secondValue = parseInt(cron[0]);
    }
    if (cron[1] !== '*') {
      frequency.minuteValue = parseInt(cron[1]);
    }
    if (cron[2] !== '*') {
      frequency.hourValue = parseInt(cron[2]);
    }
    if (cron[3] !== '*') {
      frequency.dayOfMonthValue = parseInt(cron[3]);
    }
    if (cron[4] !== '*') {
      frequency.monthValue = parseInt(cron[4]);
    }
    if (cron[5] !== '*') {
      frequency.dayOfWeekValue = parseInt(cron[5]);
    }

    //frequency.base += ''; // 'cast' to string in order to set proper value on "every" modal

    // console.log('freq ', frequency);
    return frequency;
  };

  return service;
});
