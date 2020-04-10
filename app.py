import os
import requests
import operator
import re
import nltk
import service
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from stop_words import stops
from collections import Counter
from bs4 import BeautifulSoup


app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

from models import Result


@app.route('/', methods=['GET', 'POST'])
def index():
    errors = []
    results = {}

    if request.method == "POST":
        # get url that the person has entered
        try:
            url = request.form['url']
            length = int(request.form['length'])
            r = requests.get(url)
        except:
            errors.append("Unable to get URL. Please make sure it's valid and try again.")
            return render_template('index.html', errors=errors)
        if r:
            # get count data from service
            data = service.count_words(r, length)
            
            # get results
            results = data['beauty_result']

            try:
                # save result in db
                result = Result(
                    url=url,
                    result_all=data['raw_word_count'],
                    result_no_stop_words=data['no_stop_words_count']
                )

                db.session.add(result)
                db.session.commit()
            except:
                errors.append("Unable to add item to database.")

    return render_template('index.html', errors=errors, results=results)


if __name__ == '__main__':
    app.run()