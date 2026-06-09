function draft
    code (octopress new draft $argv | grep -Eo '_.*\.md$')
end

function od --description 'Deploy an octopress site in production configuration'
    rm -rf /workspaces/clintcparker.github.com/.deploy
    set -gx JEKYLL_ENV 'production'
    jekyll build
    if set -q GITHUB_TOKEN
        git -C .deploy remote set-url origin "https://x-access-token:$GITHUB_TOKEN@github.com/clintcparker/clintcparker.github.com.git"
    end
    octopress deploy
    set -gx JEKYLL_ENV 'development'
end

function gs
    git status
end


function ga
    git add .
end


function gcm
    git commit -m "$argv"
end
