cd /d %~dp0
bundle exec jekyll build
git add -A 
git commit -m "Automated"
git push
pause