#!/bin/bash

cd ../gsan_cadastro
[ -e "log/test.log" ] && rm log/test.log
[ -e "log/development.log" ] && rm log/development.log

RAILS_ENV=test rake db:seed
RAILS_ENV=test rails s -p 3002 -d

cd ../gsan_online
[ -e "log/test.log" ] && rm log/test.log
[ -e "log/development.log" ] && rm log/development.log

if [ "$1" = "" ]; then
  rspec spec_acceptance
else
  rspec $@
fi

ps aux | grep "ruby bin/rails s -p 3002" | sed "/grep/d" | awk '{print $2}' | xargs kill
