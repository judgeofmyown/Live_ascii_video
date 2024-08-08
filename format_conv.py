from PIL import Image

image = Image.open("./luffy.jpeg")

image.save('./luffy.bmp', 'BMP')