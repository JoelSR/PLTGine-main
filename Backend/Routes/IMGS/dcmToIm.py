#import matplotlib.pyplot as plt
import sys,os
from pydicom import dcmread
from pydicom.data import get_testdata_file
import numpy as np
#import glob
from PIL import Image
import mysql.connector
from mysql.connector import errorcode

try:
	filename = "Routes/IMGS/"+sys.argv[1]
	print(sys.argv[1])
	#for filename in glob.iglob("*.dcm",recursive=True):
	#fpath = get_testdata_file('A0001451.dcm')
	ds = dcmread(str(filename))
	#print(ds)
except IOError as err:
    print("Asegure de que es un archivo Dicom.\nOS error: {0}".format(err))
	#sys.exit()

try:
	deltax,deltay = ds.PixelSpacing
except:
	print("La imágen no se pudo guardar ya que no tiene el campo 'PixelSpacing'")
	sys.exit()
#	continue
im = ds.pixel_array.astype(float)
rescalade_image = (np.maximum(im,0)/im.max())*255
final_image = np.uint8(rescalade_image)

final_image = Image.fromarray(final_image)
#final_image.show()

width, height = final_image.size
	
# Setting the points for cropped image
left = 0
#Se asumió que todos los nombres e información en las imágenes
#utilizan la misma cantidad de pixeles
top = 72 #se obtuvo al utilizar Radiant Dicom Viewer
right = width
bottom = height
	
# Cropped image of above dimension
# (It will not change original image)
final_image = final_image.crop((left, top, right, bottom))
size = final_image.size

id_pregunta = 1;

try:
	os.remove(filename)
except OSError as err:
    print("OS error: {0}".format(err))

try:
	db = mysql.connector.connect(
		host     = 'localhost',
		user     = 'root',
		password = '<mysql>',
		port     = '3306',
		database = 'proyObste'
	)
	cursor = db.cursor()
except mysql.connector.Error as err:
	if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
		print("Something is wrong with your user name or password")
	elif err.errno == errorcode.ER_BAD_DB_ERROR:
		print("Database does not exist")
	else:
		print(err)

add_image = ("INSERT INTO imagenes"
			"(image_name,image_size,deltaX,deltaY,location)"
			"VALUES (%(name)s,%(size)s,%(deltaX)s,%(deltaY)s,%(location)s)")

print(size)

nombre = sys.argv[1]+".png"

image_data = {
		'name'    : nombre,
		'size'    : str(size),
		'deltaX'  : str(deltax),
		'deltaY'  : str(deltay),
		'location': "/AutObsGine/Backend/Routes/IMGS",
}

query = ("SELECT 1 FROM imagenes WHERE image_name = %s")

try:
	nombreArch = (str(sys.argv[1]),)
	cursor.execute(query,nombreArch)
	result = cursor.fetchone()
	print(result)
	if(result is None):
		try:
			cursor.execute(add_image, image_data)
			try:
				final_image.save("Routes/IMGS/public/"+sys.argv[1]+".png")
				print("Imágen guardada correctamente")
			except OSError as err:
				print("OS error: {0}".format(err))
		except mysql.connector.errors.IntegrityError as err:
			print("La imagen ya existe",err)
	else:
		db.commit()
		cursor.close()
		db.close()
		sys.exit()
except mysql.connector.Error as err:
  print("Something went wrong: {}".format(err))

db.commit()

cursor.close()
db.close()
sys.exit()