from PIL import Image
import sys
import os
import json

# If you want to skip some images, add them here
skip_list = [
    'Atri变态去死.jpg',
    'Atri是喜欢涩涩的孩子.jpg',
    'A60加钱1.png',
]

def d_hash(image, hash_size=8):
    image2 = image.convert('L').resize(
        (hash_size + 1, hash_size),
        Image.LANCZOS,
    )
    difference = []
    for row in range(hash_size):
        for col in range(hash_size):
            pixel_left = image2.getpixel((col, row))
            pixel_right = image2.getpixel((col + 1, row))
            difference.append(pixel_left > pixel_right)
    decimal_value = 0
    hex_string = []
    for index, value in enumerate(difference):
        if value:
            decimal_value += 2**(index % 8)
        if (index % 8) == 7:
            hex_string.append(hex(decimal_value)[2:].rjust(2, '0'))
            decimal_value = 0
    return ''.join(hex_string)


def count_similarity(hash1, hash2):
    samiliarity = 0
    for i in enumerate(hash1):
        if i[1] == hash2[i[0]]:
            samiliarity += 1
    return samiliarity/len(hash1)


hash_map = {}

# Get dHash for each image in meme folder
print('Calculating dHash for each image')
for filename in os.listdir('meme'):
    if filename in skip_list:
        continue
    try:
        image = Image.open('meme/' + filename)
        hash_map[filename] = d_hash(image, 32)
    except:
        print(f'Failed to calculate dHash for {filename}')

# Check for similar images
print('Checking for similar images')
similar_images = []
for (name, hash1) in hash_map.copy().items():
    new_map = hash_map.copy()
    del new_map[name]
    for (name2, hash2) in new_map.items():
        samiliarity = count_similarity(hash1, hash2)
        if samiliarity > 0.8:
            similar_images.append((name, name2, samiliarity))

# Collect similar images
output_map = {}
for (name, name2, samiliarity) in similar_images:
    if name not in output_map:
        output_map[name] = {}
    if name2 not in output_map:
        output_map[name2] = {}
    if not (name2 in output_map[name].keys()):
        output_map[name][name2] = samiliarity
    if not (name in output_map[name2].keys()):
        output_map[name2][name] = samiliarity

# Sort similar images
output_map = sorted(output_map.items(), key=lambda x: len(x[1]), reverse=True)

# Print similar images
print('Similar images:')
for (name, similar) in output_map:
    print(f'{name} is similar to:')
    for (name2, samiliarity) in similar.items():
        print(f'    {name2} ({samiliarity*100:.2f}%)')

# Write dHash map to file
with open('static/data/images/hash_map.json', 'w', encoding='utf8') as f:
    json.dump(hash_map, f, indent=4, ensure_ascii=False)
# Write similar images to file
with open('static/data/images/similar_images.json', 'w', encoding='utf8') as f:
    json.dump(output_map, f, indent=4, ensure_ascii=False)

if len(similar_images) == 0:
    print('All images are unique')
    sys.exit(0)
else:
    print('Some images are similar')
    sys.exit(0)
