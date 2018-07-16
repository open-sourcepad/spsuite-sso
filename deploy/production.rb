require 'net/ssh/proxy/command'
require 'sshkit'
require 'sshkit/dsl'
require 'sshkit/sudo'
include SSHKit::DSL


SSHKit.config.output_verbosity = :debug

####
####
# Modify the following constants
BASTION_SSH = 'master@ec2-34-195-234-53.compute-1.amazonaws.com'
APP_SSH = 'deploy@10.0.2.242'
APP_PATH = '/home/deploy/client/current'
####
####

SSHKit::Backend::Netssh.configure do |ssh|
  ssh.ssh_options = {
    proxy: Net::SSH::Proxy::Command.new("ssh -W %h:%p #{BASTION_SSH}")
  }
end

run_locally do
  execute! 'npm run build:prod'
  execute! 'env GZIP=-9 tar -zcvf dist.tar.gz dist'
end

on APP_SSH do
  execute "mkdir -p #{APP_PATH}/dist"
  upload! 'dist.tar.gz', APP_PATH
  execute "rm -r #{APP_PATH}/dist && cd #{APP_PATH} && tar xvf dist.tar.gz"
end
