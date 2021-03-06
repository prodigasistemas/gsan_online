# config valid only for current version of Capistrano
lock '3.5.0'

set :application, 'gsan_online'
set :repo_url, 'ssh://git@gitlab.cosanpa.pa.gov.br:64422/cosanpa/gsan_online.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')
set :linked_files, %w{.env}

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'tmp/sessions', 'public/assets')
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets tmp/sessions public/assets}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do
	%w[start stop restart upgrade].each do |command|
    desc "#{command} Unicorn server."
    task command do
      on roles(:app) do
        execute "/etc/init.d/unicorn_#{fetch(:application)} #{command}"
      end
    end
  end

  desc 'Normalize asset timestamps'
  task :normalize_assets do
    on release_roles(fetch(:assets_roles)) do
      assets = fetch(:normalize_asset_timestamps)
      if assets
        within release_path do
          execute :find, "#{assets} -exec touch -t #{asset_timestamp} {} ';'; true"
        end
      end
    end
  end

  desc 'Compile assets'
  task :compile_assets do
    invoke 'deploy:assets:precompile'
  end

  after 'deploy:updated', 'deploy:compile_assets'
  after 'deploy:updated', 'deploy:normalize_assets'

  namespace :assets do
    task :precompile do
      on release_roles(fetch(:assets_roles)) do
        within release_path do
          execute :rake, "assets:precompile"
        end
      end
   end
  end

  after :deploy, "deploy:upgrade"
end
