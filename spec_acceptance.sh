#!/bin/bash
PID_FILE=/tmp/gsan_test_cadastro.pid

cd ../gsan_cadastro
rake log:clear

RAILS_ENV=test ACCEPTANCE_TEST=1 rake db:seed
RAILS_ENV=test rails s -p 3002 -d -P $PID_FILE

cd ../gsan_online
rake log:clear

if [ "$1" = "" ]; then
  rspec spec_acceptance
else
  rspec $@
fi

cd ../gsan_cadastro

if [ -e "$PID_FILE" ]; then
  kill -9 $(cat $PID_FILE);
fi
