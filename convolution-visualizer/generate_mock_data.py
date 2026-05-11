import json, math, os

def generate_shape(shape_type):
    grid = [[0.0]*28 for _ in range(28)]
    
    if shape_type == "digit_0":
        cx, cy = 14, 14
        for i in range(28):
            for j in range(28):
                d = math.sqrt((i-cy)**2 + (j-cx)**2)
                if 5.5 <= d <= 8.5:
                    grid[i][j] = min(1.0, max(0, 1.0 - abs(d - 7) / 2))
                    
    elif shape_type == "digit_1":
        for i in range(4, 24):
            grid[i][14] = 1.0
            grid[i][13] = 0.6
        grid[4][12] = 0.5; grid[4][13] = 0.8
        for j in range(11, 18): grid[23][j] = 0.8
        
    elif shape_type == "digit_2":
        for j in range(9, 19): grid[5][j] = 1.0; grid[6][j] = 0.5
        grid[7][18] = 1.0; grid[8][18] = 1.0; grid[9][18] = 1.0; grid[10][18] = 1.0
        grid[11][17] = 1.0; grid[12][16] = 1.0; grid[13][15] = 1.0; grid[14][14] = 1.0
        grid[15][13] = 1.0; grid[16][12] = 1.0; grid[17][11] = 1.0; grid[18][10] = 1.0
        for j in range(9, 19): grid[19][j] = 1.0; grid[20][j] = 0.5
        
    elif shape_type == "digit_3":
        for j in range(9, 18): grid[5][j] = 1.0
        grid[6][18] = 1.0; grid[7][18] = 1.0; grid[8][18] = 1.0; grid[9][18] = 1.0
        for j in range(12, 18): grid[12][j] = 1.0
        grid[13][18] = 1.0; grid[14][18] = 1.0; grid[15][18] = 1.0; grid[16][18] = 1.0
        grid[17][18] = 1.0; grid[18][18] = 1.0
        for j in range(9, 18): grid[20][j] = 1.0
        
    elif shape_type == "digit_4":
        for i in range(4, 14): grid[i][10] = 1.0
        for j in range(10, 20): grid[13][j] = 1.0; grid[14][j] = 0.6
        for i in range(4, 24): grid[i][17] = 1.0

    elif shape_type == "digit_5":
        for j in range(9, 19): grid[5][j] = 1.0
        grid[6][9] = 1.0; grid[7][9] = 1.0; grid[8][9] = 1.0; grid[9][9] = 1.0
        for j in range(9, 18): grid[11][j] = 1.0
        grid[12][18] = 1.0; grid[13][18] = 1.0; grid[14][18] = 1.0
        grid[15][18] = 1.0; grid[16][18] = 1.0; grid[17][18] = 1.0
        for j in range(9, 18): grid[19][j] = 1.0

    elif shape_type == "digit_6":
        for j in range(10, 18): grid[5][j] = 1.0
        for i in range(5, 21): grid[i][9] = 1.0
        for j in range(10, 18): grid[12][j] = 1.0
        for i in range(12, 21): grid[i][18] = 1.0
        for j in range(10, 18): grid[20][j] = 1.0

    elif shape_type == "digit_7":
        for j in range(9, 20): grid[5][j] = 1.0; grid[6][j] = 0.5
        for i in range(6, 23):
            col = 19 - int((i - 6) * 0.5)
            if 9 <= col < 20: grid[i][col] = 1.0

    elif shape_type == "digit_8":
        for j in range(10, 18): grid[5][j] = 1.0
        grid[6][9] = 1.0; grid[7][9] = 1.0; grid[8][9] = 1.0; grid[6][18] = 1.0; grid[7][18] = 1.0; grid[8][18] = 1.0
        for j in range(10, 18): grid[11][j] = 1.0
        grid[12][9] = 1.0; grid[13][9] = 1.0; grid[14][9] = 1.0; grid[15][9] = 1.0
        grid[12][18] = 1.0; grid[13][18] = 1.0; grid[14][18] = 1.0; grid[15][18] = 1.0
        for j in range(10, 18): grid[17][j] = 1.0

    elif shape_type == "digit_9":
        for j in range(10, 18): grid[5][j] = 1.0
        grid[6][9] = 1.0; grid[7][9] = 1.0; grid[8][9] = 1.0
        for i in range(5, 12): grid[i][18] = 1.0
        for j in range(10, 18): grid[11][j] = 1.0
        for i in range(11, 22): grid[i][18] = 1.0
        for j in range(10, 18): grid[21][j] = 1.0

    elif shape_type == "tshirt":
        for i in range(7, 24):
            for j in range(8, 20): grid[i][j] = 0.85
        for i in range(7, 13):
            for j in range(4, 9): grid[i][j] = 0.7
            for j in range(19, 24): grid[i][j] = 0.7
        for i in range(7, 10):
            for j in range(12, 16): grid[i][j] = 0.0

    elif shape_type == "trouser":
        for i in range(4, 8):
            for j in range(8, 20): grid[i][j] = 0.9
        for i in range(8, 25):
            for j in range(8, 13): grid[i][j] = 0.9
            for j in range(15, 20): grid[i][j] = 0.9

    elif shape_type == "shoe":
        for i in range(16, 22):
            for j in range(5, 24): grid[i][j] = 0.8
        for i in range(10, 16):
            for j in range(15, 24): grid[i][j] = 0.7
        for j in range(5, 10): grid[22][j] = 1.0; grid[15][j+10] = 0.5

    elif shape_type == "bag":
        for j in range(11, 17): grid[4][j] = 0.6; grid[5][j] = 0.6
        for i in range(7, 23):
            for j in range(7, 21): 
                if i == 7 or i == 22 or j == 7 or j == 20:
                    grid[i][j] = 1.0
                else:
                    grid[i][j] = 0.5
        grid[10][12] = 0.8; grid[10][13] = 0.8; grid[10][14] = 0.8; grid[10][15] = 0.8

    elif shape_type == "dress":
        for i in range(4, 10):
            w = 2
            for j in range(14-w, 14+w): grid[i][j] = 0.85
        for i in range(10, 24):
            w = 2 + int((i - 10) * 0.5)
            for j in range(max(4, 14-w), min(24, 14+w)): grid[i][j] = 0.8

    return grid

all_datasets = []

# MNIST digits
for digit in range(10):
    name = f"digit_{digit}"
    all_datasets.append({
        "id": f"mnist_{digit}",
        "name": f"MNIST - Digit {digit}",
        "category": "MNIST",
        "data": generate_shape(name)
    })

# Fashion MNIST
fashion_items = [
    ("tshirt", "T-Shirt/Top"),
    ("trouser", "Trouser"),
    ("dress", "Dress"),
    ("shoe", "Sneaker"),
    ("bag", "Bag"),
]
for key, label in fashion_items:
    all_datasets.append({
        "id": f"fmnist_{key}",
        "name": f"Fashion - {label}",
        "category": "Fashion MNIST",
        "data": generate_shape(key)
    })

js_content = f"export const datasets = {json.dumps(all_datasets, indent=2)};\n"
os.makedirs("src/data", exist_ok=True)
with open("src/data/datasets.js", "w") as f:
    f.write(js_content)
print(f"datasets.js generated with {len(all_datasets)} images")
