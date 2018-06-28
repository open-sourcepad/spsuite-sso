require 'net/ssh/proxy/command'
require 'sshkit'
require 'sshkit/dsl'
include SSHKit::DSL


SSHKit.config.output_verbosity = :debug


SSHKit::Backend::Netssh.configure do |ssh|
  ssh.ssh_options = {
    proxy: Net::SSH::Proxy::Command.new('ssh -W %h:%p deploy@spsuite-sso')
  }
end

run_locally do
  #execute 'rm -r dist'
  #execute 'npm run build:aot:prod'
  execute 'ng build --prod'
  # execute "cd dist && find . -type f ! -name '.js' -exec gzip \"{}\" \\;"
  execute 'env GZIP=-9 tar -zcvf dist.tar.gz dist'
end

on 'deploy@10.0.2.74' do
  execute 'mkdir -p /home/deploy/staging/current/dist'
  upload! 'dist.tar.gz', "/home/deploy/staging/current"
  execute 'rm -r /home/deploy/staging/current/dist && cd /home/deploy/staging/current && tar xvf dist.tar.gz'
  # execute 'cd /home/ubuntu/client/current && for i in `find | grep -E "\.css$|\.js$"`; do gzip "$i" ; done'
end
