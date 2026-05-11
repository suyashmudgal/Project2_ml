import json
import os

def generate_shape(shape_type):
    grid = [[0.0 for _ in range(28)] for _ in range(28)]
    if shape_type == "digit_1":
        for i in range(5, 23):
            grid[i][13] = 0.9; grid[i][14] = 1.0; grid[i][15] = 0.9
    elif shape_type == "digit_0":
        for i in range(28):
            for j in range(28):
                if 45 <= (i - 14)**2 + (j - 14)**2 <= 65: grid[i][j] = 1.0
                elif 35 <= (i - 14)**2 + (j - 14)**2 <= 80: grid[i][j] = 0.5
    elif shape_type == "tshirt":
        for i in range(7, 25):
            for j in range(8, 20): grid[i][j] = 0.8
        for i in range(7, 12):
            for j in range(4, 8): grid[i][j] = 0.7
            for j in range(20, 24): grid[i][j] = 0.7
        for i in range(7, 9):
            for j in range(12, 16): grid[i][j] = 0.0
    elif shape_type == "trouser":
        for i in range(5, 26):
            for j in range(8, 13): grid[i][j] = 0.9
            for j in range(15, 20): grid[i][j] = 0.9
        for i in range(5, 9):
            for j in range(13, 15): grid[i][j] = 0.9
    elif shape_type == "cross":
        for i in range(28):
            grid[i][13] = 1.0; grid[i][14] = 1.0
            grid[13][i] = 1.0; grid[14][i] = 1.0
    elif shape_type == "square":
        for i in range(8, 20):
            for j in range(8, 20):
                if i == 8 or i == 19 or j == 8 or j == 19:
                    grid[i][j] = 1.0
    elif shape_type == "diagonal":
        for i in range(28):
            grid[i][i] = 1.0
            if i+1 < 28: grid[i][i+1] = 0.8
            if i-1 >= 0: grid[i][i-1] = 0.8
    elif shape_type == "checkerboard":
        for i in range(28):
            for j in range(28):
                if (i // 4 + j // 4) % 2 == 0:
                    grid[i][j] = 1.0
    return grid

datasets = [
    { "id": "custom", "name": "Custom Drawing", "category": "Interactive", "data": [[0.0]*28 for _ in range(28)] },
    { "id": "shape_cross", "name": "Shape - Cross", "category": "Shapes", "data": generate_shape("cross") },
    { "id": "shape_square", "name": "Shape - Square Outline", "category": "Shapes", "data": generate_shape("square") },
    { "id": "shape_diagonal", "name": "Shape - Diagonal", "category": "Shapes", "data": generate_shape("diagonal") },
    { "id": "shape_checkerboard", "name": "Shape - Checkerboard", "category": "Shapes", "data": generate_shape("checkerboard") },
    { "id": "mnist_0", "name": "MNIST - Digit 0", "category": "MNIST", "data": generate_shape("digit_0") },
    { "id": "mnist_1", "name": "MNIST - Digit 1", "category": "MNIST", "data": generate_shape("digit_1") },
    { "id": "fmnist_tshirt", "name": "Fashion MNIST - T-Shirt", "category": "Fashion MNIST", "data": generate_shape("tshirt") },
    { "id": "fmnist_trouser", "name": "Fashion MNIST - Trouser", "category": "Fashion MNIST", "data": generate_shape("trouser") }
]

js_content = f"export const datasets = {json.dumps(datasets, indent=2)};\n"
os.makedirs("src/data", exist_ok=True)
with open("src/data/datasets.js", "w") as f:
    f.write(js_content)
print("datasets.js generated")
