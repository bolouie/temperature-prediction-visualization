# Temperature Prediction Visualization

This project is an interactive weather forecast visualization based on historical temperature data. Users can input a specific month, day, and hour, and the application will predict the temperature using a decision tree regression model. The backend is built with Flask, while the frontend visualization is created using D3.js.

## Table of Contents

- [Dataset](#Dataset)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Dataset
This project uses a historical temperature dataset, which includes temperature readings for each month, day, and hour. The dataset is stored in a CSV file and is preprocessed to filter out data before 2013.

## Installation

1. Clone the repository:
```
git clone https://github.com/bolouie/forecast.git
```

2. Change directory to the project folder: 
```
cd forecast
```

3. Create a virtual environment and activate it:

```commandline
python3 -m venv venv
source venv/bin/activate
```
4. Install the required dependencies:
```commandline
pip install -r requirements.txt
```

## Usage

1. Run the Flask server:
```commandline
python server.py
```

2. Open your web browser and navigate to `http://127.0.0.1:5000/` to view the visualization.


## License

This project is licensed under the MIT License. See the LICENSE file for more information.
