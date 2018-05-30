require 'rake'
require 'hanami/rake_tasks'

begin
  require 'rspec/core/rake_task'
  RSpec::Core::RakeTask.new(:spec)
  task default: :spec
rescue LoadError
end

task :webpack do
  cd 'apps/web'
  sh 'yarn run webpack --watch'
end

task :server do
  sh 'bin/hanami server'
end

multitask :run => [:server, :webpack]
