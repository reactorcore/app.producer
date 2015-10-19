var Asana = require('asana');
var client = Asana.Client.create().useBasicAuth(process.env.ASANA_API_KEY);

module.exports = client;
