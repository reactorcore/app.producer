describe("the producer.templates module", function() {
  // set up module
  beforeEach(module("producer.templates"));

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
        expect($scope.loadTags).toBeDefined();
      });
    });

  });
});