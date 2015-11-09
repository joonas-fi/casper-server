var child_process = require('child_process')
  , fs = require('fs')
  , express = require('express')
  , bodyParser = require('body-parser')
  , multipart = require('connect-multiparty');

var app = express();

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));

var multipartMiddleware = multipart();

app.post('/job', multipartMiddleware, function (req, res){
	if (!('script' in req.files)) {
		throw 'upload expected';
	}

	var script_path = req.files.script.path;

	var casper_argv = [script_path];

	if ((typeof req.body.pars) !== 'object') {
		req.body.pars = {};
	}

	for (var key in req.body.pars) {
		casper_argv.push('--' + key + '=' + req.body.pars[key]);
	}

	console.log('spawning $ casperjs ' + casper_argv.join(' '));

	var casper = child_process.spawn('casperjs', casper_argv);

	var stdout = ''
	  , stderr = '';

	casper.stdout.on('data', function (chunk){
		stdout += chunk.toString();
	});

	casper.stderr.on('data', function (chunk){
		stderr += stderr.toString();
	});

	casper.on('close', function (exit_code){
		console.log('casper exit_code=' + exit_code + '. unlinking ' + script_path);

		fs.unlink(script_path, function (err){
			if (err) { throw err; }
		});

		res.send({
			exit_code: exit_code,
			stdout: stdout,
			stderr: stderr
		});
	});
});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('casper-server @ http://%s:%s', host, port);
});
