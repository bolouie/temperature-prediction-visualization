import sys
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeRegressor

DATA_URL = "static/csv/data.csv"

def load_data(url):
    """
    Load and filter the weather data.
    
    Args:
        url (str): The URL to the CSV file containing the weather data.
    
    Returns:
        pd.DataFrame: The filtered weather data.
    """
    # Load and filter the data
    weather = pd.read_csv(url, header=0)
    weather_filtered = weather[weather["year"] > 2013]
    return weather_filtered


def train_model(weather_filtered):
    """
    Train the regression model on the filtered weather data.
    
    Args:
        weather_filtered (pd.DataFrame): The filtered weather data.
    
    Returns:
        DecisionTreeRegressor: The trained regression model.
    """
    # Train the model
    x = weather_filtered["monthdayhour"]
    y = weather_filtered["DegreeC"]
    x = x.values.reshape(-1, 1)

    regressor = DecisionTreeRegressor()
    regressor.fit(x, y)
    return regressor


def predict(regressor, input):
    """
    Make a prediction using the trained regression model.
    
    Args:
        regressor (DecisionTreeRegressor): The trained regression model.
        input (str): The input for which to make a prediction.
    
    Returns:
        float: The predicted value.
    """
    # Make a prediction
    input = np.array([input]).reshape(1, 1)
    output = regressor.predict(input)
    output = output[0]
    return output


def main():
    """
    The main function to run the script.
    """
    regressor = get_trained_model()
    result = predict(regressor, sys.argv[1])
    print(result)


def get_trained_model():
    weather_filtered = load_data(DATA_URL)
    regressor = train_model(weather_filtered)
    return regressor


if __name__ == "__main__":
    main()
