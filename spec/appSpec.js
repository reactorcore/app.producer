describe("producer.main module", function() {
  // set up module
  beforeEach(module("producer.main"));

  var $controller, TemplateServiceMock, EventsServiceMock, RolesServiceMock;

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

  describe("mainController controller", function() {
    it("should be defined", function() {
      var $scope = {};
      var mainController = $controller('mainController', { 
        $scope: $scope, 
        Template:  TemplateServiceMock, 
        Roles: RolesServiceMock, 
        Events: EventsServiceMock});
      expect(mainController).toBeDefined();
    });    
  });
});