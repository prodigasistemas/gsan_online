#!/bin/bash

cd ../gsan_cadastro
RAILS_ENV=test rake db:seed
RAILS_ENV=test rails s -p 3002 -d

cd ../gsan_online
rspec spec_acceptance $1 $2 $3 $4
ps aux | grep "ruby bin/rails s -p 3002" | sed "/grep/d" | awk '{print $2}' | xargs kill
