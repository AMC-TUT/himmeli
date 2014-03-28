himmeli
=======

Himmeli for data collection

HOW TO INSTALL

depencies

ruby 2+
rails 4+
mysql 5+

RUN IN TERMINAL

1. git clone https://github.com/AMC-TUT/himmeli.git
2. cd himmeli
3. bundle update
4. bundle install
5. RAILS_ENV=production bundle exec rake assets:clean
6. RAILS_ENV=production bundle exec rake assets:precompile
7. RAILS_ENV=production rake db:create
8. RAILS_ENV=production rake db:migrate
9. RAILS_ENV=production rake db:seed

RUN

puma -b tcp://127.0.0.1:3002 -e production