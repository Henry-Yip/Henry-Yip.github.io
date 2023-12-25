cd /d %~dp0
cmd.exe /k "bundle exec jekyll build & git add -A & git commit -m asdf & git push "