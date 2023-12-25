cd /d %~dp0
start bundle exec jekyll build
start git add -A 
start git commit -m "Automated"
start git push
pause