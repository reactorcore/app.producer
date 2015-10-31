describe("the producer.main module", function() {
  // set up module
  beforeEach(module("producer.main"));

  var $controller, TemplateServiceMock, EventsServiceMock, RolesServiceMock, createController;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  beforeEach(inject(function(){
    TemplateServiceMock = {
      submitTemplate: function() {},
    };
    EventsServiceMock = {
      getEvents: function() {},
      submitEvent: function() {}
    };
    RolesServiceMock = {
      getRoles: function() {}
    };
  }));


  describe("the mainController controller", function() {
    var $scope, mainController;

    beforeEach(function() {
      $scope = {};
      mainController = $controller('mainController', { 
        $scope: $scope, 
        Template: TemplateServiceMock, 
        Roles: RolesServiceMock, 
        Events: EventsServiceMock 
      });
    });

    describe("the mainController object", function() {
      it("should be defined", function() {
        expect(mainController).toBeDefined();
      });

      it("should have all the necessary $scope variables", function() {
        expect($scope.template.constructor).toBe(Object);
        expect($scope.roles.constructor).toBe(Array);
        expect($scope.tags.constructor).toBe(Array);
      });

      it("should have all the necessary $scope methods", function() {
        expect($scope.submitTemplate).toBeDefined();
        expect($scope.loadTags).toBeDefined();
      });
    });

  });
});