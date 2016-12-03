set :deploy_config_path, 'ops/capistrano/deploy.rb'
set :stage_config_path, 'ops/capistrano/deploy'

require 'capistrano/setup'
require 'capistrano/deploy'
require 'capistrano/git-submodule-strategy'

# import tasks from the ops submodule
Dir.glob('ops/capistrano/tasks/*.rake').each { |r| import r }
