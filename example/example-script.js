var casper = require('casper').create();

var login = {
	username: casper.cli.get('username'),
	password: casper.cli.get('password')
};

casper.start('http://casperjs.org/', function() {
    this.echo('would have used ' + login.username + '/' + login.password + ' for login');
    this.echo('casperjs.org title was ' + this.getTitle());
}).then(function (){
    casper.exit(2); // to demonstrate setting exit code
});

casper.run();
