import json
import os

def generate_shape(shape_type):
    # Generates a 28x28 array
    grid = [[0.0 for _ in range(28)] for _ in range(28)]
    if shape_type == "digit_1":
        # A vertical line roughly in the center
        for i in range(5, 23):
            grid[i][13] = 0.9
            grid[i][14] = 1.0
            grid[i][15] = 0.9
    elif shape_type == "digit_0":
        # A hollow circle
        for i in range(28):
            for j in range(28):
                if 45 <= (i - 14)**2 + (j - 14)**2 <= 65:
                    grid[i][j] = 1.0
                elif 35 <= (i - 14)**2 + (j - 14)**2 <= 80:
                    grid[i][j] = 0.5
    elif shape_type == "tshirt":
        # T-shirt shape
        for i in range(7, 25):
            for j in range(8, 20):
                grid[i][j] = 0.8
        # Sleeves
        for i in range(7, 12):
            for j in range(4, 8):
                grid[i][j] = 0.7
            for j in range(20, 24):
                grid[i][j] = 0.7
        # Neck
        for i in range(7, 9):
            for j in range(12, 16):
                grid[i][j] = 0.0
    elif shape_type == "trouser":
        for i in range(5, 26):
            for j in range(8, 13):
                grid[i][j] = 0.9
            for j in range(15, 20):
                grid[i][j] = 0.9
        for i in range(5, 9):
            for j in range(13, 15):
                grid[i][j] = 0.9

    return grid

datasets = [
    {
        "id": "mnist_0",
        "name": "MNIST - Digit 0",
        "category": "MNIST",
        "data": generate_shape("digit_0")
    },
    {
        "id": "mnist_1",
        "name": "MNIST - Digit 1",
        "category": "MNIST",
        "data": generate_shape("digit_1")
    },
    {
        "id": "fmnist_tshirt",
        "name": "Fashion MNIST - T-Shirt",
        "category": "Fashion MNIST",
        "data": generate_shape("tshirt")
    },
    {
        "id": "fmnist_trouser",
        "name": "Fashion MNIST - Trouser",
        "category": "Fashion MNIST",
        "data": generate_shape("trouser")
    }
]

js_content = f"export const datasets = {json.dumps(datasets, indent=2)};\n"

os.makedirs("src/data", exist_ok=True)
with open("src/data/datasets.js", "w") as f:
    f.write(js_content)
print("datasets.js generated")
