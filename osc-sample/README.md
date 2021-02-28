# osc-sample

Usage:

open terminal in root dir
run ./bin/osc-sample

Options:
'--hostPort': Overrides Port used by host
'--targetPort': Overrides Port to send to,
'--message': Override Message that is sent

Example using same computer 
open two terminals

Host terminal  run `./bin/osc-sample --hostPort 5302`
Target terminal run `./bin/osc-sample`


Both host and target ports default to 5300
