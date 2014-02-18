#update yum packages and grab git
sudo yum update
sudo yum install -y git

#switch to Python 2.7
sudo yum install python27
sudo rm /usr/bin/python
sudo ln -s /usr/bin/python2.7 /usr/bin/python

#install Pip
curl http://python-distribute.org/distribute_setup.py | sudo python
curl https://raw.github.com/pypa/pip/master/contrib/get-pip.py | sudo python

#download and run project
git clone https://github.com/themichaelyang/turntable
cd turntable/flask-turntable
sudo pip install -r requirements.txt

python turntable.py 8080