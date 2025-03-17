 mkdir -p /workspaces/clintcparker.github.com/gemstuff
 wget -c https://github.com/rubygems/rubygems/archive/refs/tags/v3.3.22.tar.gz -O - | tar -xz -C /workspaces/clintcparker.github.com/gemstuff
 cd /workspaces/clintcparker.github.com/gemstuff/rubygems-3.3.22/
 sudo ruby setup.rb
 cd /workspaces/clintcparker.github.com/
 bundle update