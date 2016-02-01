module.exports =  {
  getPermissions: function(req, res, next) {
    var permissions = req.user.__authorized;
    // TODO: send back even less than this?
    res.status(200).json(permissions);
  }
};
