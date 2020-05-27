import pytesseract as tess
tess.pytesseract.tesseract_cmd = r'/usr/local/Cellar/tesseract/4.1.1/bin/tesseract'
from PIL import Image

#img = Image.open('Arial.png')
img = Image.open('Bilar/Bil22.jpg')
text = tess.image_to_string(img) 
text = text.strip()
text = text.replace(" ","")
#text = text[0:int(len(text)/5)]


print(text)