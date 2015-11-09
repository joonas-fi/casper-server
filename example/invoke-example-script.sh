#!/bin/bash -eu

curl --form "script=@example-script.js" --form "pars[username]=foo" --form "pars[password]=bar" http://localhost:8081/job

echo # \n
