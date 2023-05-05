from flask import Flask, request, send_from_directory
from main import get_trained_model, predict

app = Flask(__name__)

trained_model = get_trained_model()


@app.route('/predict')
def make_prediction():
    input_value = request.args.get('input')
    prediction = predict(trained_model, input_value)
    return str(prediction)


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)


if __name__ == '__main__':
    app.run(debug=True)
