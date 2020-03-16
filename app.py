from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World!"


@app.route('/name/<name>')
def hello_name(name):
    return "Hello {}!".format(name)


@app.route('/number/<number>')
def hello_sum(number):
    return "Hello {}!".format(int(number) + int(number))


if __name__ == '__main__':
    app.run()