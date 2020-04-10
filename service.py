import operator
import re
import nltk
from stop_words import stops
from collections import Counter
from bs4 import BeautifulSoup

def count_words(r, lenght):
    # text processing (delete html tags and tokenize)
    raw = BeautifulSoup(r.text, 'html.parser').get_text()
    nltk.data.path.append('./nltk_data/')  # set the path
    tokens = nltk.word_tokenize(raw)
    text = nltk.Text(tokens)
    
    # remove punctuation and count raw words
    non_punct = re.compile('.*[A-Za-z].*')
    raw_words = [w for w in text if non_punct.match(w)]
    raw_word_count = Counter(raw_words)

    # set stop words
    no_stop_words = [w for w in raw_words if w.lower() not in stops]
    no_stop_words_count = Counter(no_stop_words)

    # get results
    results = sorted(
        no_stop_words_count.items(),
        key=operator.itemgetter(1),
        reverse=True
    )[:lenght]

    data = {
        'raw_word_count' : raw_word_count,
        'no_stop_words_count' : no_stop_words_count,
        'beauty_result' : results
    }

    return data
