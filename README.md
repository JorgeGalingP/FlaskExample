# Wordcount App
An app to count the words in a given url

# Some needed commands
cd /backend/

pg_lsclusters

pg_ctlcluster 12 main start

redis-server

sudo -E python3 worker.py

ng serve

export FLASK_APP="./backend/app.py"
export APP_SETTINGS="config.DevelopmentConfig"
export DATABASE_URL="postgresql://galing:Jor4lin6d0wZ@localhost/wordcount_dev"
export DATABASE_URL="postgresql:///wordcount_dev"
source $(pipenv --venv)/bin/activate
flask run -h 0.0.0.0