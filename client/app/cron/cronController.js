angular.module('producer.cron', [])

.controller('cronController', function($scope, Cron) {
// Minutes: 0-59
// Hours: 0-23
// Day of Month: 1-31
// Months: 0-11
// Day of Week: 0-6
  $scope.minuteValue = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  $scope.hourValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  $scope.dayOfWeekValue = [0, 1, 2, 3, 4, 5, 6];
  $scope.dayOfMonthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  $scope.monthValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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

  $scope.$watch('myFrequency', function(newValue, oldValue) {
    console.log('myFrequency has changed. newValue: ', newValue, ' oldValue ', oldValue);
    // if there is a new value in myFrequency (not undefined) and old value is undefined OR newValue.base !== oldValue.base(?)
    if (newValue && (!oldValue || newValue.base !== oldValue.base)) {
      // console.log('newValue.base: ', newValue.base);
      // if there is a newValue and newValue.base is defined
      if (newValue && newValue.base) {
        // set newValue.base to the integer value
        newValue.base = parseInt(newValue.base);
        newValue.secondValue = 0;
        console.log(newValue.base);
      }
      if(newValue && newValue.base && newValue.base >= 2) {
        // console.log('newValue.minuteValue is: ', newValue.minuteValue);
        // this line triggers another change in myFrequency
        newValue.minuteValue = $scope.minuteValue[0];
        console.log('newValue.minuteValue is: ', newValue.minuteValue);
      }
      if(newValue && newValue.base && newValue.base >= 3) {
        newValue.hourValue = $scope.hourValue[0];
      }

      if(newValue && newValue.base && (newValue.base === 4 || newValue.base === 5)) {
        newValue.dayOfMonthValue = $scope.dayOfMonthValue[0];
      }

      if(newValue && newValue.base && newValue.base === 5) {
        console.log($scope.monthValue[0]);
        newValue.monthValue = $scope.monthValue[0];
      }
      if(newValue && newValue.base && newValue.base === 6) {
        newValue.dayOfWeekValue = $scope.dayOfWeekValue[0];
      }
    }
    $scope.output = Cron.setCron(newValue);
  }, true);

}).filter('numeral', function() {
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