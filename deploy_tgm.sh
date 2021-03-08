echo 'Starting git stuff...'
git checkout master
git pull
echo 'Building...'
ghostHost=https://www.tgm.ac.at ghostApiKey=847d73bd7838dfa199ed2c16cb npm run build
echo 'Zipping Build...'
cd public
zip -r public.zip *
echo 'Deleting old build...'
ssh 193.170.8.60 -l root 'rm -rf /var/www/html/*'
echo 'Uploading new build...'
scp public.zip root@193.170.8.60:/var/www/html/
echo 'Unpacking new build...'
ssh 193.170.8.60 -l root 'cd /var/www/html/ && unzip public.zip && rm public.zip'
rm public.zip
echo 'Finished script on'
echo `date`