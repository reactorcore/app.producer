describe("the producer.templates module", function() {
  // set up module
  beforeEach(module("producer.templates"));

  var $controller, TemplateServiceMock, EventsServiceMock, RolesServiceMock, createController;
  
  beforeEach(inject(function(_$controller_, _$q_, _$rootScope_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    // $q depends on $rootScope.$apply
    // to resolve promise outside of ng digest loop
    // https://docs.angularjs.org/api/ng/service/$q
    $q = _$q_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject(function() {
    TemplateServiceMock = {
      submitTemplate: function() {},
    };
    EventsServiceMock = {
      eventsMock:[
          {text:'Monday'},
          {text:'Friday'}
        ],
      getEvents: function() {
        var deferred = $q.defer();
        //mock asynchronicity
        this.addCallCount('getEvents');
        setTimeout(function() {
          deferred.resolve({data: EventsServiceMock.eventsMock});
          //jasmine testing outside of angular digest loop & must .$apply() to resolve
          $rootScope.$apply();
        }, 10);
        return deferred.promise;
      },
      // Jasmine.spyOn destroys link between EventMock & Event obj
      // so we implement our own count obj/function to count times invoked
      countObj: {
        'getEvents':0,
        'submitEvent':0
      },
      addCallCount : function(name) {
        if(name){
          this.countObj[name]++;
        }
      },
      submitEvent: function() {}
    };
    RolesServiceMock = {
      getRoles: function() {}
    };
  }));

  describe("the templatesController controller", function() {
    var $scope, templatesController;

    beforeEach(function() {
      $scope = {};
      templatesController = $controller("templatesController", { 
        $scope: $scope, 
        Template: TemplateServiceMock, 
        Roles: RolesServiceMock,
        Events: EventsServiceMock
      });
    });

    describe("the templatesController object", function() {
      it("should be defined", function() {
        expect(templatesController).toBeDefined();
      });

      it("should have all the necessary $scope variables", function() {
        expect($scope.template.constructor).toBe(Object);
        expect($scope.roles.constructor).toBe(Array);
        expect($scope.tags.constructor).toBe(Array);
      });

      it("should have all the necessary $scope methods", function() {
        expect($scope.submitTemplate).toBeDefined();
        expect($scope.filterTags).toBeDefined();
      });

    });

    describe("the templatesController async calls", function() {
      beforeEach(function() {
        jasmine.clock().install();
        //use filterTags() to call loadTags() bc loadTags() off $scope
        $scope.filterTags('');
      });

      afterEach(function() {
        jasmine.clock().uninstall();
      });

      it('should expect Events.getEvents() to be called once', function() {
        expect(EventsServiceMock.countObj.getEvents).toBe(1);
      });

      it("should expect filterTags() to filter 'events' variable correctly", function() {
        // syncs to setTimeout which we called in the before 'filterTags()' call
        // set for one ms after setTimeout will return
        jasmine.clock().tick(11);
        expect($scope.filterTags('').length).toBe(EventsServiceMock.eventsMock.length);
        expect($scope.filterTags('Monday')[0]).toEqual({text: "Monday"});
        expect($scope.filterTags('qwertyuiop').length).toBe(0);
      });

    });

  });
});