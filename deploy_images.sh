ssh 192.168.0.30 -l root "cd /var/www/ghost/content/ && zip -r images.zip images/"
scp root@192.168.0.30:/var/www/ghost/content/images.zip .
scp images.zip root@192.168.0.31:/var/www/ghost/content/
ssh 192.168.0.31 -l root "cd /var/www/ghost/content/ && rm -rf images && unzip images.zip"
echo 'Finished script on'
echo `date`